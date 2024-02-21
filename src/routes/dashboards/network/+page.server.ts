export interface DummyProposal {
    epoch: number;
    height: number;
    miner: string;
    desc: string;
    status: string;
    tally_yes: number;
    tally_no: number;
}

const dummy_proposals: DummyProposal[] = [
    { epoch: 1017, height: 1293703, desc: "increase minimum box value", miner: "Hero miners", status: "open", tally_yes: 123, tally_no: 17 },
    { epoch: 1013, height: 1293329, desc: "increase minimum box value", miner: "88hjksue", status: "accepted", tally_yes: 763, tally_no: 260 },
    { epoch: 1013, height: 1293329, desc: "decrease data input access cost", miner: "88hjksue", status: "rejected", tally_yes: 0, tally_no: 1023 },
]

export interface Proposal {
    epoch: number;
    height: number;
    slots: [number, number, number];
    tallies: [number, number, number];
    miner: string;
}

export interface Parameter {
    height: number;
    storage_fee: number;
    min_box_value: number;
    max_block_size: number;
    max_cost: number;
    token_access_cost: number;
    tx_input_cost: number;
    tx_data_input_cost: number;
    tx_output_cost: number;
    block_version: number;
}

export interface ParameterSeries {
    heights: number[];
    storage_fees: number[];
    min_box_values: number[];
    max_block_sizes: number[];
    max_costs: number[];
    token_access_costs: number[];
    tx_input_costs: number[];
    tx_data_input_costs: number[];
    tx_output_costs: number[];
    block_versions: number[];
}

export interface TransactionStats {
    transactions: number;
    user_transactions: number;
}

export interface MinerConfig {
    miner: string;
    votes: number[];
    count: number;
}

export async function load({ locals }) {
    const client = locals.dbconn;
    const parameters = (await client.query(`
        select height
            , storage_fee
            , min_box_value
            , max_block_size
            , max_cost
            , token_access_cost
            , tx_input_cost
            , tx_data_input_cost
            , tx_output_cost
            , block_version
        from network.parameters p
        order by 1`
    )).rows as Parameter[];

    // const transaction_stats = (await client.query(`
    //     select sum(x.transactions) as transactions
    //         , sum(x.user_transactions) as user_transactions
    //     from network.transactions x
    //     join timestamps.timestamps t on t.height = x.height
    //     where timestamp >= (
    //         select timestamp - 86400000
    //         from network.transactions x
    //         join timestamps.timestamps t on t.height = x.height
    //         order by x.height desc limit 1
    //     );`
    // )).rows[0] as TransactionStats;

    const proposals = (await client.query(`
        select p.epoch
            , p.height
            , p.slots
            , p.tallies
            , coalesce(k.label, a.address) as miner
        from network.proposals p
        join core.addresses a on a.id = p.miner_address_id
        left join network.known_miners k on k.address_id = p.miner_address_id
        order by epoch desc limit 10;`
    )).rows as Proposal[];

    const miner_configs = (await client.query(`
        select coalesce(k.label, a.address) as miner
            , v.slots as votes
            , count(*) as count
        from network.votes v
        join network.mining m on m.height = v.height
        join core.addresses a on a.id = m.miner_address_id
        left join network.known_miners k on k.address_id = m.miner_address_id
        where v.height >= (select max(height) - 100 from network.votes)
        group by 1, 2
        order by 3 desc;            
        `
    )).rows as MinerConfig[];

    const height: number = (await client.query(`select max(height) as height from network.votes;`)).rows[0].height;

    return {
        height,
        latest_proposals: proposals,
        parameters: {
            heights: parameters.map((p) => p.height),
            storage_fees: parameters.map((p) => p.storage_fee),
            min_box_values: parameters.map((p) => p.min_box_value),
            max_block_sizes: parameters.map((p) => p.max_block_size),
            max_costs: parameters.map((p) => p.max_cost),
            token_access_costs: parameters.map((p) => p.token_access_cost),
            tx_input_costs: parameters.map((p) => p.tx_input_cost),
            tx_data_input_costs: parameters.map((p) => p.tx_data_input_cost),
            tx_output_costs: parameters.map((p) => p.tx_output_cost),
            block_versions: parameters.map((p) => p.block_version)
        },
        // transaction_stats,
        miner_configs,
    }
}

