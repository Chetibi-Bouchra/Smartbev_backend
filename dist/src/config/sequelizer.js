"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    database: 'smartbev4',
    username: 'root',
    password: '',
});
console.log(sequelize.define);
exports.default = sequelize;
//# sourceMappingURL=sequelizer.js.map