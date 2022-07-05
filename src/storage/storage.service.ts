import { join, sep } from 'path';
import { promises } from 'fs';
import { IStorage } from './storage.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class LocalStorage implements IStorage {
    private filePath: string;

    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.targetDir) private targetDir: string,
        @inject(TYPES.file) private file: string,
        @inject(TYPES.dir) private dir: string,
    ) {
        this.filePath = join(this.targetDir, `${this.dir}${sep}${this.file}`);
    }

    public async save(key: string | symbol, value: any) {
        const data = await this.getData(this.filePath);
        // if (typeof key === 'symbol') {
        //     if (key.description) {
        //         key = key.description;
        //     } else {
        //         return;
        //     }
        // }
        data[key] = value;
        await this.writeData(JSON.stringify(data), this.filePath);
    }

    public async get(key: string | symbol) {
        const data = await this.getData(this.filePath);
        // if (typeof key === 'symbol') {
        //     if (key.description) {
        //         key = key.description;
        //     } else {
        //         return undefined;
        //     }
        // }
        return data[key];
    }

    private async getData(fp: string) {
        if (!(await this.isExist(fp))) {
            return {};
        }
        try {
            const file = await promises.readFile(fp, 'utf-8');
            const data = JSON.parse(file);
            return data;
        } catch (error) {
            this.logger.error(`[Error][${LocalStorage.name}][${LocalStorage.prototype.getData.name}] ${error}`);
            return {};
        }
    }

    private async writeData(data: string, fp: string) {
        if (!(await this.isExist(fp))) {
            await promises.mkdir(join(this.targetDir, this.dir), { recursive: true });
        }
        await promises.writeFile(fp, data);
        return true;
    }

    private async isExist(fp: string) {
        try {
            await promises.stat(fp);
            return true;
        } catch (error) {
            this.logger.error(`[Error][${LocalStorage.name}][${LocalStorage.prototype.isExist.name}] ${error}`);
            return false;
        }
    }
}
