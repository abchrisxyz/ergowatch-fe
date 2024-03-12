
import type { Entry } from "../catalog"
import { NANO2ERG } from "../scales"

export const exchanges: Entry[] = [
    {
        id: 'cex_supply_main',
        name: 'Supply on main addresses',
        desc: 'ERG supply on exchange main addresses',
        ylabel: 'ERG',
        table: 'exchanges.supply',
        column: 'main',
        scale: NANO2ERG
    },
    {
        id: 'cex_supply_deposits',
        name: 'Supply on deposit addresses',
        desc: 'ERG supply on exchange deposit addresses',
        ylabel: 'ERG',
        table: 'exchanges.supply',
        column: 'deposits',
        scale: NANO2ERG
    },
]
