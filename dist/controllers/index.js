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
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessage = exports.startChatbot = void 0;
const chatbotService = __importStar(require("../services/chatbotService"));
const receiveMessageService = __importStar(require("../services/receiveMessageService"));
const startChatbot = (phoneNumber) => {
    try {
        const question = chatbotService.startChatbot(phoneNumber);
        return question;
    }
    catch (error) {
        return error;
    }
    ;
};
exports.startChatbot = startChatbot;
const receiveMessage = (phoneNumber, answerText) => {
    try {
        // call service for validate answer and return next question if it's valid, but the same if invalid with message
        const question = receiveMessageService.receiveMessage(phoneNumber, answerText);
        return question;
    }
    catch (error) {
        return error;
    }
};
exports.receiveMessage = receiveMessage;
//# sourceMappingURL=index.js.map