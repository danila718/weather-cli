#!/usr/bin/env node

import { getArgs } from "./services/arg.service.js";
import { printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const initCli = () => {
    const args = getArgs();
    if (args.h) {
        printHelp();
        // help command
        // return
    }
    if (args.c) {
        saveKeyValue(args.c);
    }
    if (args.t) {
       saveKeyValue(args.t);
    }
    // print weather
};

initCli();
