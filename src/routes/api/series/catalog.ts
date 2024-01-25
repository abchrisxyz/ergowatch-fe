
interface Entry {
    id: string;
    desc: string;
    table: string;
    column: string | null;
}

// Maps series id's to table/column pair
const _catalog: Entry[] = [
    {
        id: 'cnt_p2pk_ge_0',
        desc: 'Number of P2PK addresses',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'total'
    },
    {
        id: 'cnt_p2pk_ge_1',
        desc: 'Number of P2PK addresses holding at least 1 Erg',
        table: 'erg.address_counts_by_balance_p2pk',
        column: 'ge_1'
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
];

export const catalogDict = Object.assign({}, ..._catalog.map(e => ({ [e.id]: e })));
export interface EntryDescription {
    id: string;
    desc: string
}
export const catalogDesc: EntryDescription[] = _catalog.map(e => ({ id: e.id, desc: e.desc }));

