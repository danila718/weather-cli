import { Args } from "../args/args.interface";

export interface IApplication {
    init: () => void;
    saveCoordinate: (key: keyof Pick<Args, 'lat' | 'long'>, value: string) => void;
    saveToken: (token: string) => void;
    getForcast: (token: string, lat: number, long: number) => void;
}
