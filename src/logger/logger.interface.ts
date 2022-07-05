export interface ILogger {
    log: (msg: unknown) => void;
    error: (error: unknown) => void;
    success: (msg: unknown) => void;
    info: () => void;
    weather: (data: object, icon: string, condition: string) => void;
}
