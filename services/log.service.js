import chalk from 'chalk';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + error);
};

const printHelp = () => { 
    console.log(
    `${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -c [CITY] сохранение города
    -h вывод помощи
    -t [API_KEY] сохранение токена сервиса погоды` 
    );
};

export { printError, printSuccess, printHelp};
