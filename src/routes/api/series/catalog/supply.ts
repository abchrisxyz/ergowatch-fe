import type { Entry } from "../catalog"
import { NANO2ERG } from "../scales"

export const supply_by_address_type: Entry[] = [
    {
        id: 'supply_p2pks',
        name: 'ERG on wallet addresses (P2PK)',
        desc: 'ERG supply on P2PK addresses',
        ylabel: 'ERG',
        table: 'erg.supply_composition',
        column: 'p2pks',
        scale: NANO2ERG
    },
    {
        id: 'supply_miners',
        name: 'ERG on miner addresses',
        desc: 'ERG supply on miner addresses',
        ylabel: 'ERG',
        table: 'erg.supply_composition',
        column: 'miners',
        scale: NANO2ERG
    },
    {
        id: 'supply_contracts',
        name: 'ERG on contracts',
        desc: 'ERG supply on P2S(H) contracts',
        ylabel: 'ERG',
        table: 'erg.supply_composition',
        column: 'contracts',
        scale: NANO2ERG
    },
]
