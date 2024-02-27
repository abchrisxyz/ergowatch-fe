export interface MainRecord {
    name: string,
    addresses: number,
    nano: number,

}
export interface DepositRecord {
    name: string,
    addresses: number,
    unspent_addresses: number,
    nano: number,
}
export interface SupplyRecord {
    timestamp: number,
    main: number,
    deposits: number
}


export async function load({ locals }) {
    const client = locals.dbconn;

    const main = (await client.query(`
        select e.name
            , count(*) as addresses
            , sum(b.nano) as nano
        from exchanges.exchanges e
        join exchanges.main_addresses m on m.cex_id = e.id
        left join erg.balances b on b.address_id = m.address_id
        group by 1
        order by 3 desc;
    `)).rows as [MainRecord];

    const deposits = (await client.query(`
        select e.name
            , count(d.address_id) as addresses
            , count(d.address_id) filter (where b.address_id is not null) as unspent_addresses
            , sum(b.nano) as nano
        from exchanges.exchanges e
        left join exchanges.deposit_addresses d on d.cex_id = e.id
        left join erg.balances b on b.address_id = d.address_id
        group by 1;
    `)).rows as [DepositRecord];

    const supply = (await client.query(`
        select t.timestamp
            , s.main
            , s.deposits
        from exchanges.supply s
        join timestamps.hourly t on t.height = s.height
        where t.timestamp >= (extract(epoch from now() - '30 days'::interval))::bigint * 1000
        order by s.height;
    `)).rows as [SupplyRecord];

    return {
        main: main,
        deposits: deposits,
        supply: {
            timestamps: supply.map(r => r.timestamp),
            main: supply.map(r => r.main),
            deposits: supply.map(r => r.deposits),
        }
    }
}
