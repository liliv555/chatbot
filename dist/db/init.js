"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const User_1 = __importDefault(require("./models/User"));
const Question_1 = __importDefault(require("./models/Question"));
const Answer_1 = __importDefault(require("./models/Answer"));
const config_1 = __importDefault(require("../config/config"));
User_1.default.hasMany(Answer_1.default, { foreignKey: 'phoneNumber' });
Question_1.default.hasMany(User_1.default, { foreignKey: 'currentQuestionSequence', sourceKey: 'sequence' });
Answer_1.default.belongsTo(Question_1.default, { foreignKey: 'questionId' });
const dbInit = () => {
    try {
        config_1.default.sync({ force: false });
    }
    catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
};
exports.default = dbInit;
//# sourceMappingURL=init.js.map