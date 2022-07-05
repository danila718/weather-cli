import { Container } from "inversify";
import { App } from "./app/app";
import { IApplication } from "./app/app.interface";
import { IArgsService } from "./args/args.interface";
import { ArgsService } from "./args/args.service";
import { TYPES } from "./common/types";
import { ILogger } from "./logger/logger.interface";
import { Logger } from "./logger/logger.service";
import { IStorage } from "./storage/storage.interface";
import { LocalStorage } from "./storage/storage.service";
import { IWeatherService } from "./weather/weather.interface";
import { YandexWeather } from "./weather/weather.service";
import { homedir } from 'os';

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.Logger).to(Logger);
appContainer.bind<IStorage>(TYPES.Storage).to(LocalStorage);
appContainer.bind<IArgsService>(TYPES.Args).to(ArgsService);
appContainer.bind<IWeatherService>(TYPES.Weather).to(YandexWeather);
appContainer.bind<IApplication>(TYPES.Application).to(App);

appContainer.bind<string>(TYPES.targetDir).toConstantValue(homedir());
appContainer.bind<string>(TYPES.dir).toConstantValue('weather-cli');
appContainer.bind<string>(TYPES.file).toConstantValue('data.json');

const app = appContainer.get<IApplication>(TYPES.Application);

app.init();

export { app, appContainer };
