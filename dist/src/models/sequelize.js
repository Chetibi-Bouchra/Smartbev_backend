"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_models_1 = __importDefault(require("./init-models"));
const sequelizer_1 = __importDefault(require("../config/sequelizer"));
const models = (0, init_models_1.default)(sequelizer_1.default);
exports.default = models;
//# sourceMappingURL=sequelize.js.map