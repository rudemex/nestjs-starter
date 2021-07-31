"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterCharacter = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var FilterCharacter = /** @class */ (function () {
    function FilterCharacter() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsPositive(),
        swagger_1.ApiProperty({ description: 'Number of page', required: false })
    ], FilterCharacter.prototype, "page");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty({ description: 'filter by the given name', required: false })
    ], FilterCharacter.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty({
            description: 'filter by the given status',
            required: false,
            "enum": ['', 'alive', 'dead', 'unknown']
        })
    ], FilterCharacter.prototype, "status");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty({ description: 'filter by the given species', required: false })
    ], FilterCharacter.prototype, "species");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty({ description: 'filter by the given type', required: false })
    ], FilterCharacter.prototype, "type");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty({
            description: 'filter by the given gender',
            required: false,
            "enum": ['', 'female', 'male', 'genderless', 'unknown']
        })
    ], FilterCharacter.prototype, "gender");
    return FilterCharacter;
}());
exports.FilterCharacter = FilterCharacter;
