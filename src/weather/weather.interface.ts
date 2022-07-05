export interface IWeatherService {
    getWeather: (lat: number, long: number, token: string) => any,
    getIcon: () => string,
    getCondition: () => string,
}
