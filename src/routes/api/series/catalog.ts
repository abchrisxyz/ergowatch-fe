const NANO2ERG = 10 ** (-9);

interface Entry {
    id: string;
    desc: string;
    table: string;
    column: string | null;
    scale?: number;
}

// Maps series id's to table/column pair
const _catalog: Entry[] = [
    // P2PK addresses by balance
    {
        id: 'cnt_p2pk_ge_0',
        desc: 'Number of P2PK addresses',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'total'
    },
    {
        id: 'cnt_p2pk_ge_0p001',
        desc: 'Number of P2PK addresses holding at least 0.001 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_0p001'
    },
    {
        id: 'cnt_p2pk_ge_0p01',
        desc: 'Number of P2PK addresses holding at least 0.01 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_0p01'
    },
    {
        id: 'cnt_p2pk_ge_0p1',
        desc: 'Number of P2PK addresses holding at least 0.1 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_0p1'
    },
    {
        id: 'cnt_p2pk_ge_1',
        desc: 'Number of P2PK addresses holding at least 1 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_1'
    },
    {
        id: 'cnt_p2pk_ge_10',
        desc: 'Number of P2PK addresses holding at least 10 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_10'
    },
    {
        id: 'cnt_p2pk_ge_100',
        desc: 'Number of P2PK addresses holding at least 100 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_100'
    },
    {
        id: 'cnt_p2pk_ge_1k',
        desc: 'Number of P2PK addresses holding at least 1k Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_1k'
    },
    {
        id: 'cnt_p2pk_ge_10k',
        desc: 'Number of P2PK addresses holding at least 10k Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_10k'
    },
    {
        id: 'cnt_p2pk_ge_100k',
        desc: 'Number of P2PK addresses holding at least 100k Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_100k'
    },
    {
        id: 'cnt_p2pk_ge_1m',
        desc: 'Number of P2PK addresses holding at least 1M Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_1m'
    },
    // Miner contracts by balance
    {
        id: 'cnt_miners_ge_0',
        desc: 'Number of miner contracts',
        table: 'erg.address_counts_by_balance_miners',
        column: 'total'
    },
    {
        id: 'cnt_miners_ge_0p001',
        desc: 'Number of miner contracts holding at least 0.001 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_0p001'
    },
    {
        id: 'cnt_miners_ge_0p01',
        desc: 'Number of miner contracts holding at least 0.01 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_0p01'
    },
    {
        id: 'cnt_miners_ge_0p1',
        desc: 'Number of miner contracts holding at least 0.1 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_0p1'
    },
    {
        id: 'cnt_miners_ge_1',
        desc: 'Number of miner contracts holding at least 1 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_1'
    },
    {
        id: 'cnt_miners_ge_10',
        desc: 'Number of miner contracts holding at least 10 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_10'
    },
    {
        id: 'cnt_miners_ge_100',
        desc: 'Number of miner contracts holding at least 100 Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_100'
    },
    {
        id: 'cnt_miners_ge_1k',
        desc: 'Number of miner contracts holding at least 1k Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_1k'
    },
    {
        id: 'cnt_miners_ge_10k',
        desc: 'Number of miner contracts holding at least 10k Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_10k'
    },
    {
        id: 'cnt_miners_ge_100k',
        desc: 'Number of miner contracts holding at least 100k Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_100k'
    },
    {
        id: 'cnt_miners_ge_1m',
        desc: 'Number of miner contracts holding at least 1M Erg',
        table: 'erg.address_counts_by_balance_miners',
        column: 'ge_1m'
    },
    // Contracts by balance
    {
        id: 'cnt_contracts_ge_0',
        desc: 'Number of P2S(H) contracts',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'total'
    },
    {
        id: 'cnt_contracts_ge_0p001',
        desc: 'Number of P2S(H) contracts holding at least 0.001 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_0p001'
    },
    {
        id: 'cnt_contracts_ge_0p01',
        desc: 'Number of P2S(H) contracts holding at least 0.01 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_0p01'
    },
    {
        id: 'cnt_contracts_ge_0p1',
        desc: 'Number of P2S(H) contracts holding at least 0.1 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_0p1'
    },
    {
        id: 'cnt_contracts_ge_1',
        desc: 'Number of P2S(H) contracts holding at least 1 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_1'
    },
    {
        id: 'cnt_contracts_ge_10',
        desc: 'Number of P2S(H) contracts holding at least 10 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_10'
    },
    {
        id: 'cnt_contracts_ge_100',
        desc: 'Number of P2S(H) contracts holding at least 100 Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_100'
    },
    {
        id: 'cnt_contracts_ge_1k',
        desc: 'Number of P2S(H) contracts holding at least 1k Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_1k'
    },
    {
        id: 'cnt_contracts_ge_10k',
        desc: 'Number of P2S(H) contracts holding at least 10k Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_10k'
    },
    {
        id: 'cnt_contracts_ge_100k',
        desc: 'Number of P2S(H) contracts holding at least 100k Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_100k'
    },
    {
        id: 'cnt_contracts_ge_1m',
        desc: 'Number of P2S(H) contracts holding at least 1M Erg',
        table: 'erg.address_counts_by_balance_contracts',
        column: 'ge_1m'
    },
    // Supply by address type
    {
        id: 'supply_p2pks',
        desc: 'Erg supply on P2PK addresses',
        table: 'erg.supply_composition',
        column: 'p2pks',
        scale: NANO2ERG
    },
    {
        id: 'supply_miners',
        desc: 'Erg supply on miner contracts',
        table: 'erg.supply_composition',
        column: 'miners',
        scale: NANO2ERG
    },
    {
        id: 'supply_contracts',
        desc: 'Erg supply on P2S(H) contracts',
        table: 'erg.supply_composition',
        column: 'contracts',
        scale: NANO2ERG

    },


];

export const catalogDict = Object.assign({}, ..._catalog.map(e => ({ [e.id]: e })));
export interface EntryDescription {
    id: string;
    desc: string;
    scale?: number;
}
export const catalogDesc: EntryDescription[] = _catalog.map(e => ({ id: e.id, desc: e.desc, scale: e.scale }));

