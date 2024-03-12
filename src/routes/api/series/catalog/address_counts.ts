import type { Entry } from "../catalog"

enum AddressType {
    P2PK,
    Miner,
    Contract,
}

const tables = {
    [AddressType.P2PK]: 'erg.address_counts_by_balance_p2pk',
    [AddressType.Miner]: 'erg.address_counts_by_balance_miners',
    [AddressType.Contract]: 'erg.address_counts_by_balance_contracts',
}

const names = {
    [AddressType.P2PK]: 'Wallet addresses',
    [AddressType.Miner]: 'Miner addresses',
    [AddressType.Contract]: 'Contract addresses',
}

const id_keys = {
    [AddressType.P2PK]: 'p2pk',
    [AddressType.Miner]: 'miners',
    [AddressType.Contract]: 'contracts',
}

function generate_entries(variant: AddressType): Entry[] {
    const table = tables[variant];
    const name = names[variant];
    const id_key = id_keys[variant];
    return [
        {
            id: `cnt_${id_key}_ge_0`,
            name: `${name} with a non-zero balance`,
            desc: `${name} with a non-zero balance`,
            ylabel: 'Addresses',
            table: table,
            column: 'total'
        },
        {
            id: `cnt_${id_key}_ge_0p001`,
            name: `${name} with ≥ 0.001 ERG`,
            desc: `${name} with ≥ 0.001 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_0p001'
        },
        {
            id: `cnt_${id_key}_ge_0p01`,
            name: `${name} with ≥ 0.01 ERG`,
            desc: `${name} with ≥ 0.01 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_0p01'
        },
        {
            id: `cnt_${id_key}_ge_0p1`,
            name: `${name} with ≥ 0.1 ERG`,
            desc: `${name} with ≥ 0.1 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_0p1'
        },
        {
            id: `cnt_${id_key}_ge_1`,
            name: `${name} with ≥ 1 ERG`,
            desc: `${name} with ≥ 1 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_1'
        },
        {
            id: `cnt_${id_key}_ge_10`,
            name: `${name} with ≥ 10 ERG`,
            desc: `${name} with ≥ 10 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_10'
        },
        {
            id: `cnt_${id_key}_ge_100`,
            name: `${name} with ≥ 100 ERG`,
            desc: `${name} with ≥ 100 ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_100'
        },
        {
            id: `cnt_${id_key}_ge_1k`,
            name: `${name} with ≥ 1k ERG`,
            desc: `${name} with ≥ 1k ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_1k'
        },
        {
            id: `cnt_${id_key}_ge_10k`,
            name: `${name} with ≥ 10k ERG`,
            desc: `${name} with ≥ 10k ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_10k'
        },
        {
            id: `cnt_${id_key}_ge_100k`,
            name: `${name} with ≥ 100k ERG`,
            desc: `${name} with ≥ 100k ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_100k'
        },
        {
            id: `cnt_${id_key}_ge_1m`,
            name: `${name} with ≥ 1M ERG`,
            desc: `${name} with ≥ 1M ERG`,
            ylabel: 'Addresses',
            table: table,
            column: 'ge_1m'
        }
    ]
}

// P2PK addresses by balance
export const address_counts: Entry[] = [
    ...generate_entries(AddressType.P2PK),
    ...generate_entries(AddressType.Miner),
    ...generate_entries(AddressType.Contract),
]
