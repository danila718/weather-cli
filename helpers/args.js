export default class Args {

    constructor(args) {
        this.argsObj = this.initArgs(args);
    }

    initArgs = (args) => {
        const res = {};
        // const [executer, file, ...rest] = args;
        args.forEach((value, index, array) => {
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

        return res;
    }

    getArgs = () => {
        return this.argsObj;
    }

    getArg = (arg) => {
        return (this.argsObj) ? this.argsObj[arg] : undefined;
    }
}
