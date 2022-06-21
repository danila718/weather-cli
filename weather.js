#!/usr/bin/env node

import { getWeather } from "./services/api.service.js";
import { getArgs } from "./services/arg.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//60.041669, 30.334454
const DICTIONARY = {
    token: 'token',
    lat: 'lat',
    long: 'long',
}

const initCli = async () => {
    const args = getArgs();
    if (args.h) {
        printHelp();
        // help command
        // return
    }
    if (args.lat || args.long) {
        await saveCoordinates(args.lat, args.long);
    }
    if (args.t) {
        await saveToken(args.t);
    }

    const token = process.env.WEATHER_TOKEN ?? await getKeyValue(DICTIONARY.token);
    const lat = await getKeyValue(DICTIONARY.lat);
    const long = await getKeyValue(DICTIONARY.long);
    if (!token || !lat || !long) {
        printError('Сначала необходимо указать все настройки: -lat, -long, -t');
        return;
    }
    getWeather(lat, long, token);
};

const saveCoordinates = async (lat, long) => {
    if (lat && lat.length) {
        try {
            await saveKeyValue(DICTIONARY.lat, lat);
            printSuccess(`Широта {${lat}} сохранена`);
        } catch (e) {
             printError(e.message);
        }
    }
    if (long && long.length) {
        try {
            await saveKeyValue(DICTIONARY.long, long);
            printSuccess(`Долгота {${long}} сохранена`);
        } catch (e) {
             printError(e.message);
        }
    }
}

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(DICTIONARY.token, token);        
        printSuccess(`Токен {${token}} сохранён`);
    } catch (e) {
         printError(e.message);
    }
}

initCli();
