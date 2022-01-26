// import User from '../models/User'
// import Answer from '../models/Answer'
// import Question from '../models/Question'
// import * as answerDal from '../db/dal/answer'
// import { getBySequence } from './questionService';
// // export const create = (phoneNumber: string, questionId: number, interactionId: string, answerText: string): Promise<Answer> => {
// //     return answerDal.create(phoneNumber, questionId, interactionId, answerText)
// // }
// export const validAnswer = async (currentUser: User, currentQuestion: Question, answerText: string) => {
//     try {
//         console.log("valid answer")
//         console.log(currentUser.currentQuestionSequence)
//         currentUser.currentQuestionSequence ++;
//         await currentUser.save();
//         console.log(currentUser)
//         const question = await getBySequence(currentUser.currentQuestionSequence)
//         console.log("the next question: ", question)
//         answerDal.create(currentUser.phoneNumber, currentQuestion.questionId, currentUser.currentInteractionId, answerText);
//         return question;
//     } catch (error) {
//         console.log("ERROR                     :", error)
//     }
// }
// export const invalidAnswer = (currentQuestion: Question, message: string) => {
//     try {
//         console.log("valid answer")
//         currentQuestion.questionText = message;
//         console.log("the wrong question text: ", currentQuestion.questionText)
//         return currentQuestion;
//     } catch (error) {
//         console.log("ERROR                     :", error)
//     }
// }
//# sourceMappingURL=answerService.js.map