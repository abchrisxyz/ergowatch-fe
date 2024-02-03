export interface TimestampRecord {
    height: number;
    timestamp: number;
}

export async function load({ locals }) {
    const client = locals.dbconn;
    const timestamps = (await client.query(`
        select height
            , timestamp
        from timestamps.weekly
        order by height;`
    )).rows as [TimestampRecord];

    return {
        heights: timestamps.map(tr => tr.height),
        timestamps: timestamps.map(tr => tr.timestamp),
    }
}
