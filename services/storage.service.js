import { homedir } from 'os';
import { join, sep } from 'path';
import { promises } from 'fs';

const dirName = 'weather-cli';
const fileName = 'data.json';
const path = homedir();
const filePath = join(path, `${dirName}${sep}${fileName}`);

const saveKeyValue = async (key, value) => {
    const data = await getData(filePath);
    data[key] = value;
    await writeData(JSON.stringify(data), filePath);
};

const getKeyValue = async (key) => {
    const data = await getData(filePath);
    return data[key];
}

const getData = async (fp) => {
    if (!(await isExist(fp))) {
        return {};
    }
    try {
        const file = await promises.readFile(fp);
        const data = JSON.parse(file);
        return data;
    } catch (error) {
        return {};
    }
}

const writeData = async (data, fp) => {
    if (!(await isExist(fp))) {
        await promises.mkdir(join(path, dirName), { recursive: true });
    }
    await promises.writeFile(fp, data);
    return true;
}

const isExist = async (fp) => {
    try {
        await promises.stat(fp);
        return true;
    } catch (error) {
        return false;
    }
}

export { saveKeyValue, getKeyValue };
