import * as chatbotService from '../services/chatbotService'
import * as receiveMessageService from '../services/receiveMessageService'

export const startChatbot = (phoneNumber: string) => {
    try {
        const question = chatbotService.startChatbot(phoneNumber);
        return question;
    } catch (error) {
        return error;
    };
}

export const receiveMessage = (phoneNumber: string, answerText: string) => {
    try {
        // call service for validate answer and return next question if it's valid, but the same if invalid with message
        const question = receiveMessageService.receiveMessage(phoneNumber, answerText);
        return question;
    } catch (error) {
      return error;
    }
}