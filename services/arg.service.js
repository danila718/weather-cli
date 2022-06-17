const readArgs = (args) => {
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

export const getArgs = () => {
    return readArgs(process.argv);
}
