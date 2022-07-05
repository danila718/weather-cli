import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { IStorage } from "../storage/storage.interface";
import { DICTIONARY } from "../common/dictionary";
import { TYPES } from "../common/types";
import { IApplication } from "./app.interface";
import { Args, IArgsService } from "../args/args.interface";
import { IWeatherService } from "../weather/weather.interface";
import 'reflect-metadata'

@injectable()
export class App implements IApplication {

    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.Storage) private storage: IStorage,
        @inject(TYPES.Args) private argsService: IArgsService,
        @inject(TYPES.Weather) private weather: IWeatherService,
    ) { }

    async init() {
        const args: Args = this.argsService.getArgs(process.argv);
        if (args.lat) {
            await this.saveCoordinate('lat', args.lat);
        }
        if (args.long) {
            await this.saveCoordinate('long', args.long);
        }
        if (args.t) {
            await this.saveToken(args.t);
        }
        if (args.h) {
            this.logger.info();
            return;
        }

        const token = process.env.WEATHER_TOKEN ?? await this.storage.get(DICTIONARY.token);
        const lat = process.env.WEATHER_LAT ?? await this.storage.get(DICTIONARY.lat);
        const long = process.env.WEATHER_LONG ?? await this.storage.get(DICTIONARY.long);
        if (!token || !lat || !long) {
            this.logger.error('Сначала необходимо указать все настройки: -lat, -long, -t');
            return;
        }
        this.getForcast(token, lat, long);
    };

    async saveCoordinate(key: keyof Pick<Args, 'lat' | 'long'>, value: string) {
        // if (!lat && !long) {
        //     this.logger.error('Не переданы -lat, -long');
        //     return;
        // }
        try {
            await this.storage.save(DICTIONARY[key], value);
            this.logger.success(`${key === 'lat' ? 'Широта' : 'Долгота'} {${value}} сохранена`);
        } catch (e) {
            this.logger.error(e);
        }
        
    }

    async saveToken(token: string) {
        if (!token.length) {
            this.logger.error('Не передан токен')
            return;
        }
        try {
            await this.storage.save(DICTIONARY.token, token);
            this.logger.success(`Токен {${token}} сохранён`);
        } catch (e) {
            this.logger.error(e);
        }
    }

    async getForcast(token: string, lat: number, long: number) {
        try {
            const weather = await this.weather.getWeather(lat, long, token);
            this.logger.weather(weather, this.weather.getIcon(), this.weather.getCondition());
        } catch (e: any) {
            if ([404, 400].includes(e?.response?.status)) {
                this.logger.error('Неверно указаны -lat (долгота) и/или -long (широта)');
            } else if ([401, 403].includes(e?.response?.status)) {
                this.logger.error('Неверно указан токен');
            } else {
                this.logger.error(e);
            }
        }
    }
}
