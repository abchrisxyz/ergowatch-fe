export interface State {
    height: number;
    oracle: number;
    circ_sc: number;
    circ_rc: number;
    reserves: number;
    sc_nano_net: number;
    rc_nano_net: number;
}

export interface Service {
    address_id: number;
    tx_count: number;
    first_tx: number;
    last_tx: number;
    fees: number;
    volume: number;
}

export async function load({ locals }) {
    const client = locals.dbconn;
    const state = (await client.query(`
        select height
            , oracle
            , circ_sc
            , circ_rc
            , reserves
            , sc_nano_net
            , rc_nano_net
        from sigmausd.history
        order by height desc
        limit 1;`
    )).rows[0] as State;
    const services = (await client.query(`
        select address_id 
            , tx_count
            , first_tx
            , last_tx
            , fees
            , volume
        from sigmausd.services
        order by volume desc;`
    )).rows as [Service];

    return {
        state: state,
        services: services,
    }
}
