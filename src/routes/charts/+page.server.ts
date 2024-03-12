import { entry_description_groups, type EntryDescriptionGroup } from '../api/series/catalog';

export function load() {
    return {
        catalog: entry_description_groups as EntryDescriptionGroup[]
    }
}
