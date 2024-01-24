import { catalogDesc, type EntrDescription } from '../api/series/catalog';

export function load() {
    return {
        catalog: catalogDesc as EntrDescription[]
    }
}
