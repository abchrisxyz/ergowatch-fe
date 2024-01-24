import { json } from "@sveltejs/kit";
import { catalogDict } from "../catalog";

const maxLimit = 1_000;

const DAY_MS = 86_400_000;

/**
 * Retrieve data points from series.
 * 
 * @param id: ID of series to be queried
 * @param fr: optional first timestamp of time window
 * @param to: optional last timestamp of time window
 * @param r: optional resolution of time windows
 * @returns Slice of series data
 */
export async function GET({ locals, params, url }) {
    const fr = url.searchParams.get('fr');
    const to = url.searchParams.get('to');

    // Determine time resolution based on time-window
    const fr_ts = Number(fr);
    const to_ts = to === null ? Date.now() : Number(to);
    const nb_days = (to_ts - fr_ts) / DAY_MS;
    const resolution = nb_days <= 6 ? 'hourly' : nb_days <= 366 ? 'daily' : 'weekly';

    if (!catalogDict.hasOwnProperty(params.id)) {
        return new Response(JSON.stringify({ "detail": 'unknown dataset id' }), { status: 404 });
    }
    const d = catalogDict[params.id];

    const qry = `
        select t.timestamp as t
            , d.${d.column} as v
        from ${d.table} d
        join timestamps.${resolution} t on d.height = t.height
        where t.timestamp >= $1
        order by 1;
    `;
    const client = locals.dbconn;
    let rows = (await client.query(qry, [fr])).rows;

    return json({ timestamps: rows.map(r => r.t), values: rows.map(r => r.v) });
}
