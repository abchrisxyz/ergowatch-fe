export interface Cursor {
    height: number;
    blocks_since_start: number;
    rollbacks_since_start: number;
    bps_since_start: number;
    bps_last_100: number;
}

export interface Worker {
    name: string;
    height: number;
}

export interface Data {
    cursors: { [key: string]: Cursor };
    workers: [Worker];
}
