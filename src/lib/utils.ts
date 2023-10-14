/**
 * Formats a millisecond timestamp.
 * @returns {string} Local date string.
 */
export function formatMilliseconds(ms: number): string {
    return (new Date(ms)).toLocaleDateString();
}
