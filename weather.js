#!/usr/bin/env node

import ArgHelper from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";

const initCli = () => {
    const argHelper = new ArgHelper(process.argv);

    const args = argHelper.getArgs();
    if (args.h) {
        printHelp();
        // help command
        // return
    }
    if (args.s) {
        // save sity
    }
    if (args.t) {
        // save token
    }
    // print weather
};

initCli();
