import axios from 'axios';

const getWeather = async (lat, long, token) => {
    const { data } = await axios.get('https://api.weather.yandex.ru/v2/forecast', {
        params: {
            lat: lat,
            lon: long,
            lang: 'ru_RU'
        },
        headers: {
            'X-Yandex-API-Key': token
        }
    });

    return data;
}


const getIcon = (icon) => {
    switch (icon) {
        case 'skc_d':
            return '☀️';
        case 'skc_n':
            return '🌙';
        case 'ovc_ts_ra':
            return '⛈';
        case 'bkn_d':
        case 'bkn_n':
            return '⛅️';
        case 'bkn_-ra_d':
        case 'bkn_-ra_n':
            return '🌥';
        case 'bkn_-sn_d':
        case 'bkn_-sn_n':
            return '❄️';
        case 'bkn_ra_d':
        case 'bkn_ra_n':
            return '🌦';
        case 'bkn_sn_d':
        case 'bkn_sn_n':
            return '🌨';
        case 'ovc':
        case 'ovc_-ra':
        case 'ovc_-sn':
            return '☁️';
        case 'ovc_ra':
        case 'ovc_sn':
            return '🌧';
        case 'fg_d':
            return '🌫';
        default:
            return '⛅️';
    }
}

const getCondition = (condition) => {
    switch (condition) {
        case 'clear':
            return 'Ясно';
        case 'partly-cloudy':
            return 'Малооблачно';
        case 'cloudy':
            return 'Облачно с прояснениями';
        case 'overcast':
            return 'Пасмурно';
        case 'drizzle':
            return 'Морось';
        case 'light-rain':
            return 'Небольшой дождь';
        case 'rain':
        case 'moderate-rain':
            return 'Дождь';
        case 'heavy-rain':
        case 'continuous-heavy-rain':
            return 'Сильный дождьдь';
        case 'showers':
            return 'Ливень';
        case 'wet-snow':
            return 'Дождь со снегом';
        case 'light-snow':
            return 'Небольшой снег';
        case 'snow':
            return 'Снег';
        case 'snow-showers':
            return 'Снегопад';
        case 'hail':
            return 'Град';
        case 'thunderstorm':
            return 'Гроза';
        case 'thunderstorm-with-rain':
            return 'Дождь с грозой';
        case 'thunderstorm-with-hail':
            return 'Гроза с градом';
    }
}

export { getWeather, getIcon, getCondition };
