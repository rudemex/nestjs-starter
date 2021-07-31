"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('config', function () {
    return {
        testEnv: process.env.TEST_KEY,
        services: {
            rickAndMortyAPI: process.env.RICK_AND_MORTY_API
        }
    };
});
