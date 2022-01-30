"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
var Types;
(function (Types) {
    Types["Text"] = "text";
    Types["Date"] = "date";
    Types["Option"] = "option";
})(Types = exports.Types || (exports.Types = {}));
;
;
;
class Question extends sequelize_1.Model {
}
;
Question.init({
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    sequence: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    questionText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    questionType: {
        type: sequelize_1.DataTypes.ENUM('text', 'date', 'option'),
        allowNull: false,
    }
}, {
    timestamps: false,
    sequelize: config_1.default,
    modelName: 'Question'
});
exports.default = Question;
//# sourceMappingURL=Question.js.map