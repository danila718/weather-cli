import { injectable } from "inversify";
import { Args, IArgsService } from "./args.interface";
import 'reflect-metadata';

@injectable()
export class ArgsService implements IArgsService {
    getArgs(argsArray: string[]): Args {
        const res: any = {};
        // const [executer, file, ...rest] = args;
        argsArray.forEach((value, index, array) => {
            if (value.charAt(0) == '-') {
                if (index == array.length - 1) {
                    res[value.substring(1)] = true;
                } else if (array[index + 1].charAt(0) != '-') {
                    res[value.substring(1)] = array[index + 1];
                } else {
                    res[value.substring(1)] = true;
                }
            }
        });

        const args: Args = res;
        return args;
    };
}
