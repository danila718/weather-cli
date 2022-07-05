export interface Args {
    t: string,
    lat?: string,
    long?: string,
    h?: boolean, 
}

export interface IArgsService {
    getArgs: (args: string[]) => Args;
}
