import { writable, get, type Writable } from "svelte/store";
import { type Dataset } from "../api/series/catalog";
import { theme } from "../theme";

type Timestamp = number | undefined;
type TimeRange = { fr: Timestamp, to: Timestamp };

let isInitial = true;
let initialTimeWindowId = "1m";
const initialData = {
    datasets: [] as Dataset[],
    timestamps: [1600000000],
    values: [[0]],
};
const initialOpts = {
    height: 500,
    scales: {
        x: {
            time: true
        }
    },
    axes: [{}, { size: 80, label: "", labelSize: 16, labelGap: 5 }],
    series: [
        {
        },
        {
            stroke: () => get(theme).dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)',
        }
    ],
    cursor: {
        lock: true,
        focus: {
            prox: 16
        },
        points: {
            fill: (u: any, i: number) => u.series[i].stroke()
        }
    }
};

export const dataStore = writable(initialData);
export const optsStore: Writable<object> = writable(initialOpts);
export const readyStore: Writable<boolean> = writable(false);
export const timeWindowStore: Writable<string> = writable(initialTimeWindowId);

const DAY_MS = 86_400_000;
function getTimeWindowRange(timeWindowId: string): TimeRange {
    const now = Date.now();
    let fr = undefined;
    if (timeWindowId === "1m") {
        fr = now - 30 * DAY_MS;
    } else if (timeWindowId === "3m") {
        fr = now - 90 * DAY_MS;
    } else if (timeWindowId === "1y") {
        fr = now - 365 * DAY_MS;
    } else if (timeWindowId === "all") {
        fr = 0;
    }
    return {
        fr, to: undefined
    }
}

export async function setTimeWindow(newTimeWindowId: string) {
    if (newTimeWindowId === get(timeWindowStore)) return;
    timeWindowStore.update(() => newTimeWindowId);
    if (!isInitial) {
        await refreshSeries(newTimeWindowId);
    }

}

export async function setSeries(dataset: Dataset, seriesIndex: number) {
    readyStore.set(false);

    let timeWindowId = get(timeWindowStore);
    let timeRange = getTimeWindowRange(timeWindowId);
    const [timestamps, values] = await prepareSeries(dataset, timeRange);

    optsStore.update((curr: any) => {
        let opts = Object(curr)
        opts.axes[1] = { ...curr.axes[1], label: dataset.ylabel };
        return opts;
    });

    dataStore.update((curr) => {
        let numberOfSeries = curr.values.length;
        if (numberOfSeries === 1) {
            // Only one existing series, can overwrite it all
            curr.datasets = [dataset];
            curr.timestamps = timestamps;
            curr.values = [values];
        }
        else {
            if (seriesIndex < numberOfSeries) {
                // Replace existing series
                curr.datasets[seriesIndex] = dataset;
                curr.values[seriesIndex] = values;
            } else {
                // Appending new series
                curr.datasets.push(dataset);
                curr.values.push(values);
            }
            if (!isInitial) {
                // Check timestamps are compatible
                console.warn("todo: check timestamps match")
            }
        }
        return curr;
    });
    if (isInitial) {
        isInitial = false;
    }
    readyStore.set(true);

}

/**
 * Fetch series and apply options.
 * 
 * @param dataset Dataset to retrieve data for
 * @param timeRange time range to retrieve data for
 * @returns timestamp and value arrays
 */
async function prepareSeries(dataset: Dataset, timeRange: TimeRange) {
    let seriesData = await fetchSeries(dataset.id, timeRange);
    if (seriesData === null) {
        console.warn("No data for dataset", dataset.id);
        return [[], []];
    }

    // Unpack data
    let [timestamps, values] = seriesData;

    // Apply scale
    if (dataset.scale !== undefined) {
        values = values.map(v => v * dataset!.scale!)
    }

    return [timestamps, values]

}

async function fetchSeries(seriesID: string, timeRange: TimeRange): Promise<[number[], number[]] | null> {
    let url = `/api/series/${seriesID}`;
    const { fr, to } = timeRange;
    if (fr !== undefined || to !== undefined) {
        url += "?";
        let prefix = "";
        if (fr !== undefined) {
            url += `fr=${timeRange.fr}`;
            prefix = "&"
        }
        if (to !== undefined) url += `${prefix}to=${timeRange.to}`;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch to series data (${res.status})`);
        }
        const payload = await res.json();
        return [payload.timestamps, payload.values]
    } catch (e) {
        console.log(e)
    };
    return null;
}

// Refetch data for all series
async function refreshSeries(timeWindowId: string) {
    readyStore.set(false);
    const ds = get(dataStore);
    const timeRange = getTimeWindowRange(timeWindowId);
    let timestamps: number[];
    let values: number[][] = [];
    for (const [i, dataset] of ds.datasets.entries()) {
        const seriesData = await prepareSeries(dataset, timeRange)
        if (seriesData) {
            if (i === 0) {
                timestamps = seriesData[0];
            }
            values.push(seriesData[1]);
        }
    }
    dataStore.update((curr) => {
        curr.timestamps = timestamps;
        curr.values = values;
        return curr;
    })
    readyStore.set(true);
}
