import { address_counts } from "./catalog/address_counts";
import { exchanges } from "./catalog/exchanges";
import { supply_by_address_type } from "./catalog/supply";


/**
 * Exposed dataset attributes and settings.
 */
export interface Dataset {
    id: string;
    name: string;
    desc: string;
    ylabel: string;
    scale?: number;
}

/**
 * Series data-source. Backend only.
 */
export interface DataSource {
    table: string;
    column: string | null;
}

/**
 * A catalog entry combining all info relating to a dataset.
 */
export interface CatalogEntry {
    dataset: Dataset;
    source: DataSource;
}

/**
 * A named group of catalog entries
 */
interface CatalogEntryGroup {
    name: string,
    entries: CatalogEntry[],
}

/**
 * A named group of dataset.
 */
export interface DatasetGroup {
    name: string;
    datasets: Dataset[]
}

/**
 * Defines groups and contained entries.
 */
const _groups: CatalogEntryGroup[] = [
    { name: "Addresses", entries: address_counts },
    { name: "Exchanges", entries: exchanges },
    { name: "Supply", entries: supply_by_address_type },
];

/**
 * Maps individual entry ID's to entries for quick retrieval of full entry.
 */
export const catalog_entry_lookup: { [key: string]: CatalogEntry } = _groups.flatMap(g => g.entries).reduce((d: { [key: string]: CatalogEntry }, e) => {
    d[e.dataset.id] = e;
    return d;
}, {});

/**
 * Generate grouped datasets from grouped catalog entries
 */
export const datasetGroups: DatasetGroup[] = _groups.map(g => ({
    name: g.name,
    datasets: g.entries.map(e => e.dataset),
}));
