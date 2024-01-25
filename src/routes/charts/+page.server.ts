import { catalogDesc, type EntryDescription } from '../api/series/catalog';

export function load() {
    return {
        catalog: catalogDesc as EntryDescription[]
    }
}
