import { json } from "@sveltejs/kit";

const windows = ['1d', '5d', '30d', '90d'];
const windowSet = new Set(windows);
const days: { [key: string]: number } = {
    '1d': 1,
    '5d': 5,
    '30d': 30,
    '90d': 90,
}

export async function GET({ locals, params }) {
    const window = params.window;
    if (!windowSet.has(window)) {
        return new Response(JSON.stringify({ "detail": `window is not valid; permitted: ${windows}` }), { status: 422 });
    }

    /*
    select array_agg(timestamp order by timestamp) as timestamps
        , array_agg(oracle_price order by timestamp) as oracle_prices
        , array_agg(reserves order by timestamp) as reserves
        , array_agg(circ_sigusd order by timestamp) as circ_sigusd
        , array_agg(circ_sigrsv order by timestamp) as circ_sigrsv
    from sig.series_history_mv
    where timestamp >= (extract(epoch from now() - '{days} days'::interval))::bigint;
    */

    const d: number = days[window];
    const qry1 = `
            select h.timestamp
            , s.oracle
            , s.circ_sc
            , s.circ_rc
            , s.reserves
        from sigmausd.history s
        join sigmausd.headers h on h.height = s.height
        where h.timestamp >= (extract(epoch from now() - '${d} days'::interval))::bigint * 1000
        order by 1;
    `;
    const qry2 = `
            select height
            , oracle
            , circ_sc
            , circ_rc
            , reserves
        from sigmausd.history
        where height >= 1050743
        order by 1;
    `;

    const client = locals.dbconn;
    let rows = (await client.query(qry1)).rows;
    let payload = {
        example: rows[0],
        ts: rows.map(r => r.timestamp),
        // height: rows.map(r => r.height),
        oracle: rows.map(r => r.oracle),
        circ_sc: rows.map(r => r.circ_sc),
        circ_rc: rows.map(r => r.circ_rc),
        reserves: rows.map(r => r.reserves),
    };
    return json(payload);
}
