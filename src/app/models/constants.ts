


export enum colors {
    Red,
    Green,
    Blue,
    Yellow,
    Orange,
    Purple,
    Pink,
    White,
    Teal
}
export const start_Count = 2;
export const sleep = async (time: any) => {
    return new Promise(resolve => setTimeout(resolve, time));
}