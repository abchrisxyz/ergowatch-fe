import type { Entry } from "../catalog"
import { NANO2ERG } from "../scales"

export const supply_by_address_type: Entry[] = [
    {
        id: 'supply_p2pks',
        label: 'Erg on wallet addresses (P2PK)',
        desc: 'Erg supply on P2PK addresses',
        table: 'erg.supply_composition',
        column: 'p2pks',
        scale: NANO2ERG
    },
    {
        id: 'supply_miners',
        label: 'Erg on miner addresses',
        desc: 'Erg supply on miner addresses',
        table: 'erg.supply_composition',
        column: 'miners',
        scale: NANO2ERG
    },
    {
        id: 'supply_contracts',
        label: 'Erg on contracts',
        desc: 'Erg supply on P2S(H) contracts',
        table: 'erg.supply_composition',
        column: 'contracts',
        scale: NANO2ERG
    },
]
