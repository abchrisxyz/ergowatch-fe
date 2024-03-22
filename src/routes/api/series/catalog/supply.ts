import type { CatalogEntry } from "../catalog"
import { NANO2ERG } from "../scales"

export const supply_by_address_type: CatalogEntry[] = [
    {
        dataset: {
            id: 'supply_p2pks',
            name: 'ERG on wallet addresses (P2PK)',
            desc: 'ERG supply on P2PK addresses',
            ylabel: 'ERG',
            scale: NANO2ERG
        },
        source: {
            table: 'erg.supply_composition',
            column: 'p2pks',
        }
    },
    {
        dataset: {
            id: 'supply_miners',
            name: 'ERG on miner addresses',
            desc: 'ERG supply on miner addresses',
            ylabel: 'ERG',
            scale: NANO2ERG
        },
        source: {
            table: 'erg.supply_composition',
            column: 'miners',
        }
    },
    {
        dataset: {
            id: 'supply_contracts',
            name: 'ERG in contracts',
            desc: 'ERG supply on P2S(H) contracts',
            ylabel: 'ERG',
            scale: NANO2ERG
        },
        source: {
            table: 'erg.supply_composition',
            column: 'contracts',
        }
    },
]
