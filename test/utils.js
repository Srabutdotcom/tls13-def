function hexSplitToArray(hex) { return hex.split(/\s/).filter(e => e.length).map(e => Number(`0x${e}`)) }
export function toUint8Array(str) { return new Uint8Array(hexSplitToArray(str)) }