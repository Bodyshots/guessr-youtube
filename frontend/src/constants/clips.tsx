export const ClipConstants = Object.freeze({
    RANDOM: 'Random',
    SHORT: 'Short clips (<10s)',
    LONG: 'Long clips (>40s)',
    POPULAR: 'Popular clips (>100,000 views)',
    FORSEN: 'forsen',
})

export type ClipType =
    | 'Random'
    | 'Short clips (<10s)'
    | 'Long clips (>40s)'
    | 'Popular clips (>100,000 views)'
    | 'forsen';