"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPhoneNumber = exports.findOrCreate = void 0;
const User_1 = __importDefault(require("../models/User"));
const uuid_1 = require("uuid");
const findOrCreate = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [user, _] = yield User_1.default.findOrCreate({
            where: { phoneNumber: phoneNumber },
            defaults: { currentQuestionSequence: 1, currentInteractionId: (0, uuid_1.v4)() },
        });
        return user;
    }
    catch (error) {
        throw new Error('Could not create or find user.');
    }
});
exports.findOrCreate = findOrCreate;
const getByPhoneNumber = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findByPk(phoneNumber);
    if (!user) {
        throw new Error('Could not find user with this phone number.');
    }
    ;
    return user;
});
exports.getByPhoneNumber = getByPhoneNumber;
//# sourceMappingURL=user.js.map