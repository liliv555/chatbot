import * as chatbotService from '../services/chatbotService';
import * as receiveMessageService from '../services/receiveMessageService';

export const startChatbot = async (phoneNumber: string) => {
    try {
        const question: string = await chatbotService.startChatbot(phoneNumber);
        return question;
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    };
};

export const receiveMessage = async (phoneNumber: string, answerText: string) => {
    try {
        const question: string = await receiveMessageService.receiveMessage(phoneNumber, answerText);
        return question;
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    };
};