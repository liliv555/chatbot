"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
// export interface UserOuput extends Required<UserAttributes> {}
class User extends sequelize_1.Model {
}
User.init({
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    currentQuestionSequence: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    currentInteractionId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    sequelize: config_1.default,
    modelName: 'User'
});
exports.default = User;
//# sourceMappingURL=User.js.map