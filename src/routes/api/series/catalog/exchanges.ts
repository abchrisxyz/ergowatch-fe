import type { CatalogEntry } from "../catalog"
import { NANO2ERG } from "../scales"

export const exchanges: CatalogEntry[] = [
    {
        dataset: {
            id: 'cex_supply_main',
            name: 'Supply on main addresses',
            desc: 'ERG supply on exchange main addresses',
            ylabel: 'ERG',
            scale: NANO2ERG
        },
        source: {
            table: 'exchanges.supply',
            column: 'main',

        }
    },
    {
        dataset: {
            id: 'cex_supply_deposits',
            name: 'Supply on deposit addresses',
            desc: 'ERG supply on exchange deposit addresses',
            ylabel: 'ERG',
            scale: NANO2ERG
        },
        source: {
            table: 'exchanges.supply',
            column: 'deposits',
        }
    },
]
