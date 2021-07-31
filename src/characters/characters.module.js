"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CharactersModule = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("@nestjs/axios");
var characters_controller_1 = require("./controllers/characters.controller");
var characters_service_1 = require("./services/characters.service");
var CharactersModule = /** @class */ (function () {
    function CharactersModule() {
    }
    CharactersModule = __decorate([
        common_1.Module({
            imports: [axios_1.HttpModule],
            controllers: [characters_controller_1.CharactersController],
            providers: [characters_service_1.CharactersService]
        })
    ], CharactersModule);
    return CharactersModule;
}());
exports.CharactersModule = CharactersModule;
