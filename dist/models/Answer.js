"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Answer extends sequelize_1.Model {
}
Answer.init({
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    interactionId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    answerText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: config_1.default,
    modelName: 'Answer'
});
exports.default = Answer;
//# sourceMappingURL=Answer.js.map