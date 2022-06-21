#!/usr/bin/env node

import { getCondition, getIcon, getWeather } from "./services/api.service.js";
import { getArgs } from "./services/arg.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
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
    if (args.lat || args.long) {
        await saveCoordinates(args.lat, args.long);
    }
    if (args.t) {
        await saveToken(args.t);
    }
    if (args.h) {
        printHelp();
        return;
    }

    const token = process.env.WEATHER_TOKEN ?? await getKeyValue(DICTIONARY.token);
    const lat = process.env.WEATHER_LAT ?? await getKeyValue(DICTIONARY.lat);
    const long = process.env.WEATHER_LONG ?? await getKeyValue(DICTIONARY.long);
    if (!token || !lat || !long) {
        printError('Сначала необходимо указать все настройки: -lat, -long, -t');
        return;
    }
    getForcast(token, lat, long);
};

const saveCoordinates = async (lat, long) => {
    if (!lat.length && !long.length) {
        printError('Не переданы -lat, -long');
        return;
    }
    if (lat.length) {
        try {
            await saveKeyValue(DICTIONARY.lat, lat);
            printSuccess(`Широта {${lat}} сохранена`);
        } catch (e) {
             printError(e.message);
        }
    }
    if (long.length) {
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

const getForcast = async (token, lat, long) => {
    try {
        const weather = await getWeather(lat, long, token);
        printWeather(weather, getIcon(weather?.fact?.icon), getCondition(weather?.fact?.condition));
    } catch (e) {
        if ([404, 400].includes(e?.response?.status)) {
            printError('Неверно указаны -lat (долгота) и/или -long (широта)');
        } else if ([401, 403].includes(e?.response?.status)) {
            printError('Неверно указан токен');
        
        } else {
            printError(e.message);
        }
    }
}

initCli();
