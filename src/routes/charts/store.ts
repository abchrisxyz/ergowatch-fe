import { writable, get, type Writable } from "svelte/store";
import { theme } from "../theme";

type Timestamp = number | undefined;
type TimeRange = { fr: Timestamp, to: Timestamp };

let isInitial = true;
let timeWindowId = "1m";
const initialData = {
    seriesIds: ["dummy"],
    timestamps: [1600000000],
    values: [[0]],
};
const initialOpts = {
    height: 400,
    scales: {
        x: {
            time: true
        }
    },
    axes: [{}, { size: 70 }],
    series: [
        {
        },
        {
            stroke: () => get(theme).dark ? 'red' : 'blue',
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
    if (newTimeWindowId === timeWindowId) return;
    timeWindowId = newTimeWindowId;
    await refreshSeries();

}


export async function setSeries(seriesId: string, seriesIndex: number, scale: number | undefined) {
    readyStore.set(false);

    let timeRange = getTimeWindowRange(timeWindowId);
    const seriesData = await fetchSeries(seriesId, timeRange);
    if (seriesData === null) return;
    const [timestamps, values] = seriesData;

    dataStore.update((curr) => {
        let numberOfSeries = curr.values.length;
        if (numberOfSeries === 1) {
            // Only one existing series, can overwrite it all
            curr.seriesIds = [seriesId];
            curr.timestamps = timestamps;
            if (scale === undefined) {
                curr.values = [values];
            } else {
                console.log("scale:", scale);
                curr.values = [values.map(v => v * scale)]
            }

        }
        else {
            if (seriesIndex < numberOfSeries) {
                // Replace existing series
                curr.seriesIds[seriesIndex] = seriesId;
                curr.values[seriesIndex] = values;
            } else {
                // Appending new series
                curr.seriesIds.push(seriesId);
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
        // updateStrokes();
        isInitial = false;
    }
    readyStore.set(true);

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
async function refreshSeries() {
    readyStore.set(false);
    const ds = get(dataStore);
    const timeRange = getTimeWindowRange(timeWindowId);
    let timestamps: number[];
    let values: number[][] = [];
    for (const [i, seriesId] of ds.seriesIds.entries()) {
        const seriesData = await fetchSeries(seriesId, timeRange)
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
