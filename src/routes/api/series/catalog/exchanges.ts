
import type { Entry } from "../catalog"
import { NANO2ERG } from "../scales"

export const exchanges: Entry[] = [
    {
        id: 'cex_supply_main',
        label: 'Supply on main addresses',
        desc: 'Erg supply on exchange main addresses',
        table: 'exchanges.supply',
        column: 'main',
        scale: NANO2ERG
    },
    {
        id: 'cex_supply_deposits',
        label: 'Supply on deposit addresses',
        desc: 'Erg supply on exchange deposit addresses',
        table: 'exchanges.supply',
        column: 'deposits',
        scale: NANO2ERG
    },
]
