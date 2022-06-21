import axios from 'axios';

const getWeather = async (lat, long, token) => {
    let resData = {};
    try {
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
        resData = data;
        console.log(resData);
    } catch (error) {
        console.log(error.message);
    }
    
    return resData;
}

export { getWeather };
