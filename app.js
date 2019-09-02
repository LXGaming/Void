"use strict";

const fs = require("fs");
const logger = require("./util/logger");
const minecraft = require("minecraft-protocol");
const process = require("process");
const reference = require("./util/reference");

if (process.send) {
    process.send("ready");
}

var server = minecraft.createServer({
    "port": 25565,
    "host": "0.0.0.0",
    "online-mode": true,
    "beforePing": function(response, client) {
        return {
            "version": {
                "name": reference.name + " v" + reference.version,
                "protocol": client.version
            },
            "players": {
                "max": 133337,
                "online": 133337,
                "sample": []
            },
            "description": {
                "text": "",
                "color": "white",
                "extra": [
                    {
                        "text": "Thanks for the connection spam\n",
                        "color": "dark_red"
                    },
                    {
                        "text": reference.source,
                        "color": "blue"
                    }
                ]
            },
            "favicon": server.favicon
        };
    },
    "motd": reference.name + " v" + reference.version,
    "maxPlayers": 0,
    "favicon": getServerIcon()
});

server.on("connection", function(client) {
    logger.info("Connection from {}:{}", client.socket.remoteAddress, client.socket.remotePort);
});

server.on("login", function(client) {
    logger.info("Login from {}:{}", client.socket.remoteAddress, client.socket.remotePort);
    client.end(reference.name + " v" + reference.version + "\n" + reference.source);
});

logger.info("{} v{} has started", reference.name, reference.version);

process.on("SIGINT", function() {
    shutdown();
});

process.on("message", function(message) {
    if (message === "shutdown") {
        shutdown();
    }
});

function getServerIcon() {
    var bitmap = fs.readFileSync("server-icon.png");
    return "data:image/png;base64," + Buffer.from(bitmap).toString("base64");
}

function shutdown() {
    logger.info("Shutting down...");
    process.exit(0);
}