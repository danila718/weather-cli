import chalk from 'chalk';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
};

const printHelp = () => { 
    console.log(
    `${chalk.bgCyan(' HELP ')}
Без параметров - вывод погоды
Широту и долготу можно получить здесь: https://yandex.ru/maps
-lat [latitude] широта
-long [longitude] долгота
-h вывод помощи
-t [API_KEY] сохранение токена сервиса погоды`);
};

export { printError, printSuccess, printHelp};
