┘
export const rnd = (min: number, max: number, dp = 0) => parseFloat((Math.random() * (max - min) + min).toFixed(dp));
export const coin = (p = 0.5) => Math.random() < p;
export const choice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];