"use strict";

const chalk = require("chalk");

function log(color, level, message, ...args) {
    console.log(color(format("[{}] [{}]: {}", getTime(), level, format(message, ...args))));
}

function format(message, ...args) {
    var messageIndex = 0;
    var errors = [];
    for (var index = 0; index < args.length; index++) {
        messageIndex = message.indexOf("{}", messageIndex);
        if (messageIndex < 0 || messageIndex > message.length) {
            if (args[index] instanceof Error) {
                errors.push(args[index]);
            }

            continue;
        }
        
        var messageLength = message.length;
        message = message.substring(0, messageIndex) + getString(args[index]) + message.substring(messageIndex + 2);
        messageIndex += message.length - messageLength;
    }

    for (var index = 0; index < errors.length; index++) {
        message += "\n" + errors[index].stack;
    }

    return getString(message);
}

function getString(object) {
    if (object != null) {
        return object.toString();
    }

    return "undefined";
}

function getTime() {
    var date = new Date();
    return pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
}

function pad(value) {
    if (value.toString().length === 1) {
        return "0" + value;
    }

    return value;
}

module.exports.info = function(message, ...args) {
    log(chalk.white, "INFO", message, ...args);
};

module.exports.warn = function(message, ...args) {
    log(chalk.yellow, "WARN", message, ...args);
};

module.exports.error = function(message, ...args) {
    log(chalk.red, "ERROR", message, ...args);
};

module.exports.debug = function(message, ...args) {
    log(chalk.blue, "DEBUG", message, ...args);
};