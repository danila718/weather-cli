export interface IStorage {
    save: (key: string | symbol, value: any) => void; 
    get: (key: string | symbol) => any; 
}
