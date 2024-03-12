import { address_counts } from "./catalog/address_counts";
import { exchanges } from "./catalog/exchanges";
import { supply_by_address_type } from "./catalog/supply";

/**
 * Full entry definition, including db specific data.
 * For backend use only.
 */
export interface Entry {
    id: string;
    label: string;
    desc: string;
    table: string;
    column: string | null;
    scale?: number;
}

/**
 * A group of related entries.
 */
export interface EntryGroup {
    name: string,
    entries: Entry[],
}

/**
 * A truncated version of an Entry.
 * 
 * Holds describing features only and nothing relating to internal db representation.
 * Safe to be exposed to frontend.
 */
export interface EntryDescription {
    id: string;
    label: string;
    desc: string;
    scale?: number;
}

/**
 * A group of related entry descriptions.
 */
export interface EntryDescriptionGroup {
    name: string,
    entries: EntryDescription[],
}

/**
 * Defines groups and contained entries.
 */
const _groups: EntryGroup[] = [
    { name: "Addresses", entries: address_counts },
    { name: "Exchanges", entries: exchanges },
    { name: "Supply", entries: supply_by_address_type },
];

/**
 * Maps individual entry ID's to entries for quick retrieval of full entry.
 */
export const catalog_entry_lookup: { [key: string]: Entry } = _groups.flatMap(g => g.entries).reduce((d: { [key: string]: Entry }, e) => {
    d[e.id] = e;
    return d;
}, {});

/**
 * Converts entries to entry descriptions.
 * @param entries Collection of entries to be converted
 * @returns a Collection of entry descriptions
 */
function map_entries_to_descriptions(entries: Entry[]): EntryDescription[] {
    return entries.map(e => ({ id: e.id, label: e.label, desc: e.desc, scale: e.scale }))
}

/**
 * Grouped entry descriptions.
 */
export const entry_description_groups: EntryDescriptionGroup[] = _groups.map(g => ({
    name: g.name,
    entries: map_entries_to_descriptions(g.entries),
}));
