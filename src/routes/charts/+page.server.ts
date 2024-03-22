import { datasetGroups, type DatasetGroup } from '../api/series/catalog';

export function load() {
    return {
        catalog: datasetGroups as DatasetGroup[]
    }
}
