
export async function load({ locals }) {
    const client = locals.dbconn;
    const p2pks = (await client.query(`
        select total
        from erg.address_counts_by_balance_p2pk
        order by height desc
        limit 1;
    `)).rows[0].total as number;
    const miners = (await client.query(`
        select total
        from erg.address_counts_by_balance_miners
        order by height desc
        limit 1;
    `)).rows[0].total as number;
    const contracts = (await client.query(`
        select total
        from erg.address_counts_by_balance_contracts
        order by height desc
        limit 1;
    `)).rows[0].total as number;

    return {
        p2pks: p2pks,
        miners: miners,
        contracts: contracts,
    }
}
