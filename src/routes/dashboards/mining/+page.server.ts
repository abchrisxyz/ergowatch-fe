export interface Stats {
    height: number;
    hash_rate_24h: number;
    difficulty: number;
}

export interface MinerDist {
    miner: string;
    prc: number;
}

export interface Record {
    t: number;
    hps: number;
}

export async function load({ locals }) {
    const client = locals.dbconn;

    const stats = (await client.query(`
        select height
            , hash_rate_24h_mean as hash_rate_24h
            , difficulty
        from network.mining 
        order by height desc
        limit 1;`
    )).rows[0] as Stats;

    const blocks = (await client.query(`
        select count(*)
        from network.mining m
        join timestamps.timestamps t on t.height = m.height
        where t.timestamp >= (select timestamp from timestamps.timestamps order by height desc limit 1) - 86400000`
    )).rows[0].count as number;

    const hash_rate = ((await client.query(`
        select t.timestamp as t
            , m.hash_rate_24h_mean hps
        from network.mining m
        join timestamps.hourly t on t.height = m.height
        order by t.height desc
        limit 240;`
    )).rows as Record[]).reverse();

    const miner_distribution = (await client.query(`
        select coalesce(k.label, a.address) as miner
            , count(*) / 100. as prc
        from network.mining m
        left join network.known_miners k on k.address_id = m.miner_address_id
        left join core.addresses a on a.id = m.miner_address_id
        where height >= (select max(height) from network.mining) - 10000
        group by 1
        order by 2 desc
        `
    )).rows as MinerDist[];

    return {
        stats,
        blocks,
        miner_distribution,
        hash_rate: {
            ts: hash_rate.map(r => r.t),
            hps: hash_rate.map(r => r.hps),
        },
    }
}
