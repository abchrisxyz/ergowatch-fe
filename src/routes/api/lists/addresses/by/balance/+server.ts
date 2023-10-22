import { json } from "@sveltejs/kit";

const maxLimit = 10_000;


/**
 * Ergo rich list.
 * 
 * Legacy API, still used by explorer.
 * @param limit: number of records to return.
 * @returns Collection of addresses with highest balance.
 */
export async function GET({ locals, url }) {
    const limit = url.searchParams.get('limit') ?? '100';

    const n = Number(limit);
    if (Number.isNaN(n) || n < 1 || n > maxLimit) {
        return new Response(JSON.stringify({ "detail": `limit must be an integer between 1 and ${maxLimit}` }), { status: 422 });
    }

    const qry = `
        select a.address
            , b.nano as balance
        from erg.balances b
        join core.addresses a on a.id = b.address_id
        where a.id <> 1
        order by b.nano desc
        limit $1;
    `;

    const client = locals.dbconn;
    let rows = (await client.query(qry, [n])).rows;
    return json(rows);
}
