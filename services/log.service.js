import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
};

const printHelp = () => { 
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
};

const printWeather = (data, icon, condition) => {
    const geoObject = data?.geo_object;
    const fact = data?.fact;
    console.log(
        dedent
        `\n
        ${chalk.bgYellow(' WEATHER ')} Погода в ${geoObject?.country?.name}, ${geoObject?.locality?.name}, ${geoObject?.district?.name}
        ${icon} ${condition}
        Температура: ${fact?.temp} (ощущается как ${fact?.feels_like})
        Влажность: ${fact?.humidity} %
        Скорость ветра: ${fact?.wind_speed} м/с
        \n`
    );
};

export { printError, printSuccess, printHelp, printWeather};
