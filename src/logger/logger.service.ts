// import * as chalk from 'chalk';
import dedent from 'dedent';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface';
import 'reflect-metadata';
import chalk from 'chalk';

@injectable()
export class Logger implements ILogger {

    log(msg: unknown) {
        console.log(msg);
    }

    success(msg: unknown) {
        console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
    }

    error(error: unknown) {
        let msg = '';
        if (typeof error === "string") {
            msg = error;
        } else if (error instanceof Error) {
            msg = error.message
        }
        console.log(chalk.bgRed(' ERROR ') + ' ' + msg);
    }

    info() {
        console.log(
            dedent`${chalk.bgCyan(' HELP ')}
            Без параметров - вывод погоды
            Широту и долготу можно получить здесь: https://yandex.ru/maps
            -lat [latitude] широта
            -long [longitude] долгота
            -h вывод помощи
            -t [API_KEY] сохранение токена сервиса погоды
            `
        );
    }

    weather(data: any, icon: string, condition: string) {
        const geoObject = data?.geo_object;
        const fact = data?.fact;
        console.log(
            dedent
                `
        ${chalk.bgMagenta(' WEATHER ')} Погода в ${geoObject?.country?.name}, ${geoObject?.locality?.name}, ${geoObject?.district?.name}
        ${icon}  ${condition}
        Температура: ${fact?.temp} (ощущается как ${fact?.feels_like})
        Влажность: ${fact?.humidity} %
        Скорость ветра: ${fact?.wind_speed} м/с
        `
        );
    }
}
