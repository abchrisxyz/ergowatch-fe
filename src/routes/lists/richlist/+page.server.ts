export interface Balance {
    address: string;
    balance: number;
    mean_age_timestamp: number;
}

export async function load({ locals }) {
    const client = locals.dbconn;
    const balances = (await client.query(`
        select a.address
            , b.nano as balance
            , b.mean_age_timestamp
        from erg.balances b
        join core.addresses a on a.id = b.address_id
        where a.id not in (1, 596523, 599350)
        order by b.nano desc
        limit 100`
    )).rows as Balance[];

    return {
        balances,
    }
}
