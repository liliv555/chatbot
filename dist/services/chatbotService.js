"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChatbot = exports.getBySequence = void 0;
const userDal = __importStar(require("../db/dal/user"));
const questionDal = __importStar(require("../db/dal/question"));
const uuid_1 = require("uuid");
const findOrCreate = (phoneNumber) => {
    return userDal.findOrCreate(phoneNumber);
};
const getBySequence = (sequence) => {
    return questionDal.getBySequence(sequence);
};
exports.getBySequence = getBySequence;
const phoneValidation = (phoneNumber) => {
    // validation for spanish phone numbers
    const phoneRegex = new RegExp('^\\+34(?:6[0-9]|7[1-9])[0-9]{7}$');
    return (phoneRegex.test(phoneNumber));
};
const startChatbot = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    // if phone number is not valid throws an error with 500 status
    if (!phoneValidation(phoneNumber)) {
        throw ({ status: 500, code: 'PHONE_NUMBER_NOT_VALID', message: 'Phone number is not valid.' });
    }
    //  finds or creates the user, sets the current question sequence to 1 and generates a new interaction id
    const currentUser = yield findOrCreate(phoneNumber);
    currentUser.currentQuestionSequence = 1;
    currentUser.currentInteractionId = (0, uuid_1.v4)();
    yield currentUser.save();
    // query for the first question
    const questionText = (yield (0, exports.getBySequence)(currentUser.currentQuestionSequence)).questionText;
    return questionText;
});
exports.startChatbot = startChatbot;
//# sourceMappingURL=chatbotService.js.map