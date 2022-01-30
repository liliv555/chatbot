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
exports.isLastQuestion = exports.getBySequence = void 0;
const Question_1 = __importDefault(require("../models/Question"));
const getBySequence = (sequence) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield Question_1.default.findByPk(sequence);
    if (!question) {
        throw new Error('Could not find question with this sequence.');
    }
    ;
    return question;
});
exports.getBySequence = getBySequence;
const isLastQuestion = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const totalQuestions = yield Question_1.default.count();
    return (totalQuestions == question.sequence);
});
exports.isLastQuestion = isLastQuestion;
//# sourceMappingURL=question.js.map