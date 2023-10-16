import { redirect } from "@sveltejs/kit";
import type { State } from "./+page.server";

const TOTAL_SIGRSV_TOKENS = 10000000000001
const MIN_RESERVE_RATIO = 400; // %
const MAX_RESERVE_RATIO = 800; // %
const RESERVECOIN_DEFAULT_PRICE = 1000000; // nanoERG (0.001 ERG)
const FEE_PERCENT = 2; // %

export interface StateInfo {
    sigusd: CoinInfo;
    sigrsv: CoinInfo;
    reserves: ReserveInfo;
}

export interface CoinInfo {
    circulating: number;
    price: number;
    mintable: number;
    redeemable: number;
    // avgROI: number;
}

export interface ReserveInfo {
    total: number;
    liabilities: number;
    equity: number;
    rr: number;
    tvl: number;
}

export function deriveStateInfo(state: State): StateInfo {
    const reserves = Number(state.reserves);
    // SigUSD has 2 decimals
    const scCirc = Number(state.circ_sc) / 100;
    const rcCirc = Number(state.circ_rc);
    const pegRate = Number(state.oracle);

    const equity = _equity(reserves, scCirc, pegRate);

    return {
        sigusd: {
            circulating: scCirc,
            price: _scRate(reserves, scCirc, pegRate),
            mintable: _mintableSC(reserves, scCirc, pegRate),
            redeemable: scCirc,
        },
        sigrsv: {
            circulating: rcCirc,
            price: _rcRate(rcCirc, equity),
            mintable: _mintableRC(reserves, scCirc, rcCirc, pegRate),
            redeemable: _redeemableRC(reserves, scCirc, rcCirc, pegRate),
        },
        reserves: {
            total: reserves,
            liabilities: _liabilities(reserves, scCirc, pegRate),
            equity: equity,
            rr: _reserveRatio(reserves, scCirc, pegRate),
            tvl: reserves / pegRate,
        }
    }

}

/*
 * Outstanding liabilities in nanoERG's to cover stable coins in circulation.
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _liabilities(baseReserves: number, scCirc: number, pegRate: number): number {
    if (scCirc === 0) return 0;

    const baseReservesNeeded = scCirc * pegRate;
    return Math.min(baseReserves, baseReservesNeeded)
}

/*
 * Equity (i.e. reserves - liabilities) [nanoERG]
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _equity(baseReserves: number, scCirc: number, pegRate: number): number {
    const liabs = _liabilities(baseReserves, scCirc, pegRate);
    if (baseReserves <= liabs) {
        return 0;
    }
    return baseReserves - liabs;
}

/*
 * Stable coin price [nanoERG]
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _scRate(baseReserves: number, scCirc: number, pegRate: number): number {
    const liabs = _liabilities(baseReserves, scCirc, pegRate);
    if (scCirc === 0 || pegRate < liabs / scCirc) {
        return pegRate;
    } else {
        return liabs / scCirc;
    }
}

/*
 * Reserve coin price [nanoERG]
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * rcCirc: number of reserve coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _rcRate(rcCirc: number, equity: number): number {
    if (rcCirc <= 1 || equity === 0) {
        return RESERVECOIN_DEFAULT_PRICE;
    }
    return equity / rcCirc;
}

/*
 * Current reserve ratio in %
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _reserveRatio(baseReserves: number, scCirc: number, pegRate: number): number {
    if (baseReserves === 0 || pegRate === 0) return 0;
    if (scCirc === 0) return baseReserves * 100 / pegRate;
    const scRatePrc = (baseReserves * 100) / scCirc;
    return scRatePrc / pegRate;
}

/*
 * Base cost of minting SC or RC [nanoERG]
 * This is price of stable coins + fees that go to reserve.
 *
 * rate: coin price [nanoERG]
 * nbToMint: number of stable coins to be minted [-]
 */
function _baseCostToMint(rate: number, nbToMint: number): number {
    const noFeeCost = rate * nbToMint;
    const protocolFee = noFeeCost * FEE_PERCENT / 100;
    return noFeeCost + protocolFee;
}

/*
 * Amount of stable coin that can be minted whilst satisfying RR constraints.
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _mintableSC(baseReserves: number, scCirc: number, pegRate: number): number {
    const msc = (baseReserves - MIN_RESERVE_RATIO / 100 * pegRate * scCirc) / (pegRate * (MIN_RESERVE_RATIO / 100 - (1 + FEE_PERCENT / 100)));
    return Math.max(0, msc);
}

/*
 * Amount of reserve coin that can be redeemed whilst satisfying RR constraints.
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * rcCirc: number of reserve coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _redeemableRC(baseReserves: number, scCirc: number, rcCirc: number, pegRate: number): number {
    const equity = _equity(baseReserves, scCirc, pegRate);
    const rcRate = _rcRate(rcCirc, equity)
    const rsc = (baseReserves - MIN_RESERVE_RATIO / 100 * pegRate * scCirc) / (rcRate * 0.98);
    return Math.round(Math.max(0, rsc));
}

function _rrAfterMintingRC(baseReserves: number, scCirc: number, rcCirc: number, pegRate: number, nbToMint: number): number {
    const equity = _equity(baseReserves, scCirc, pegRate);
    const rcRate = _rcRate(rcCirc, equity)
    var newBaseReserves = baseReserves + _baseCostToMint(rcRate, nbToMint);
    return _reserveRatio(newBaseReserves, scCirc, pegRate);
}

/*
 * Amount of reserve coin that can be redeemed whilst satisfying RR constraints.
 *
 * baseReserves: total amount in reserves [nanoERG]
 * scCirc: number of stable coins in circulation [-]
 * rcCirc: number of reserve coins in circulation [-]
 * pegRate: current ERG/USD price [nanoERG]
 */
function _mintableRC(baseReserves: number, scCirc: number, rcCirc: number, pegRate: number): number {
    let low = 0;
    let high = TOTAL_SIGRSV_TOKENS;
    while (low <= high) {
        var mid = ((high - low) / 2) + low;
        const new_rr = _rrAfterMintingRC(baseReserves, scCirc, rcCirc, pegRate, mid);
        // console.log(low, high, new_rr);
        if (new_rr === MAX_RESERVE_RATIO) {
            return mid;
        }

        if (new_rr > MAX_RESERVE_RATIO) {
            high = mid - 1;
        }

        if (new_rr < MAX_RESERVE_RATIO) {
            low = mid + 1;
        }
    }
    return Math.round(low);
}
// 4 092 590 736
