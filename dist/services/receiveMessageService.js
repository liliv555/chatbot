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
exports.receiveMessage = void 0;
const Question_1 = require("../db/models/Question");
const userDal = __importStar(require("../db/dal/user"));
const answerDal = __importStar(require("../db/dal/answer"));
const questionDal = __importStar(require("../db/dal/question"));
const chatbotService_1 = require("./chatbotService");
const getByPhoneNumber = (phoneNumber) => {
    return userDal.getByPhoneNumber(phoneNumber);
};
const receiveMessage = (phoneNumber, answerText) => __awaiter(void 0, void 0, void 0, function* () {
    // looks up the user and the current question in the db and validates the question
    // replies with the next question if the answer was valid, or lets the user know how to
    // give a valid answer.
    try {
        const currentUser = yield getByPhoneNumber(phoneNumber);
        const question = yield (0, chatbotService_1.getBySequence)(currentUser.currentQuestionSequence);
        const currentQuestionType = question.questionType;
        return validateQuestion(currentQuestionType, answerText, currentUser, question);
    }
    catch (error) {
        console.log(error);
    }
});
exports.receiveMessage = receiveMessage;
const validateQuestion = (currentQuestionType, answerText, currentUser, question) => __awaiter(void 0, void 0, void 0, function* () {
    switch (currentQuestionType) {
        case Question_1.Types.Text:
            if (answerText.length > 0) {
                return (yield validAnswer(currentUser, question, answerText));
            }
            else {
                const message = "Please type in your answer.";
                return invalidAnswer(question, message);
            }
            ;
        case Question_1.Types.Date:
            const regex = new RegExp(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
            if (regex.test(answerText)) {
                return (yield validAnswer(currentUser, question, answerText));
            }
            else {
                const message = "Please specify the date in YYYY-MM-DD format.";
                return invalidAnswer(question, message);
            }
        case Question_1.Types.Option:
            // for simplicity, I assume there are only 3 options.
            // Otherwise we would need an extra column in the Question table: numberOfOptions
            if ((answerText == 'A') || (answerText == 'B') || (answerText == 'C')) {
                return (yield validAnswer(currentUser, question, answerText));
            }
            else {
                const message = "Please reply A, B or C depending on which option you would like to choose.";
                return invalidAnswer(question, message);
            }
        default:
            throw ({ status: 500, code: 'QUESTION_TYPE_NOT_VALID', message: 'Question type is not valid.' });
    }
});
const validAnswer = (currentUser, currentQuestion, answerText) => __awaiter(void 0, void 0, void 0, function* () {
    // if the answer is valid move on to the next question, save the answer in the database
    // and reply with the next question
    try {
        currentUser.currentQuestionSequence++;
        yield currentUser.save();
        const question = yield (0, chatbotService_1.getBySequence)(currentUser.currentQuestionSequence);
        answerDal.create(currentUser.phoneNumber, currentQuestion.questionId, currentUser.currentInteractionId, answerText);
        if (yield questionDal.isLastQuestion(currentQuestion))
            return;
        return question.questionText;
    }
    catch (error) {
        console.log(error);
    }
});
const invalidAnswer = (currentQuestion, message) => {
    // if the answer is not what's expected reply with a preconfigured message
    // depending on the type of the question
    try {
        currentQuestion.questionText = message;
        return currentQuestion.questionText;
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=receiveMessageService.js.map