import User from '../db/models/User';
import Question from '../db/models/Question';
import { Types } from '../db/models/Question';

import * as userDal from '../db/dal/user'
import * as answerDal from '../db/dal/answer'
import * as questionDal from '../db/dal/question'

import { getBySequence } from './chatbotService';

const getByPhoneNumber = (phoneNumber: string): Promise<User> => {
    return userDal.getByPhoneNumber(phoneNumber)
}
export const receiveMessage = async (phoneNumber: string, answerText: string) => {
  // looks up the user and the current question in the db and validates the question
  // replies with the next question if the answer was valid, or lets the user know how to
  // give a valid answer.
    try {
        const currentUser: User = await getByPhoneNumber(phoneNumber);
        const question: Question = await getBySequence(currentUser.currentQuestionSequence)
        const currentQuestionType: Types = question.questionType;
        return validateQuestion(currentQuestionType, answerText, currentUser, question)
    } catch (error) {
        console.log(error);
    }
}

const validateQuestion = async (currentQuestionType: Types, answerText: string, currentUser: User, question: Question) => {
  switch (currentQuestionType) {
    case Types.Text:
      if (answerText.length > 0) {
        return (await validAnswer(currentUser, question, answerText));
      } else {
        const message = "Please type in your answer.";
        return invalidAnswer(question, message);
      };
    case Types.Date:
      const regex = new RegExp(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
      if (regex.test(answerText)) {
        return (await validAnswer(currentUser, question, answerText)); 
      } else {
        const message = "Please specify the date in YYYY-MM-DD format.";
        return invalidAnswer(question, message);
      }
    case Types.Option:
      // for simplicity, I assume there are only 3 options.
      // Otherwise we would need an extra column in the Question table: numberOfOptions
      if ((answerText == 'A') || (answerText == 'B') || (answerText == 'C')) {
        return ( await validAnswer(currentUser, question, answerText));
      } else {
        const message = "Please reply A, B or C depending on which option you would like to choose.";
        return invalidAnswer(question, message);
      }
    default:
      throw ({ status: 500, code: 'QUESTION_TYPE_NOT_VALID', message: 'Question type is not valid.' })
  }
}

const validAnswer = async (currentUser: User, currentQuestion: Question, answerText: string) => {
  // if the answer is valid move on to the next question, save the answer in the database
  // and reply with the next question
    try {
        currentUser.currentQuestionSequence ++;
        await currentUser.save();
        const question = await getBySequence(currentUser.currentQuestionSequence)
        answerDal.create(currentUser.phoneNumber, currentQuestion.questionId, currentUser.currentInteractionId, answerText);
        if (await questionDal.isLastQuestion(currentQuestion)) return;
        return question.questionText;
    } catch (error) {
        console.log(error)
    }
}

const invalidAnswer = (currentQuestion: Question, message: string) => {
  // if the answer is not what's expected reply with a preconfigured message
  // depending on the type of the question
    try {
        currentQuestion.questionText = message;
        return currentQuestion.questionText;
    } catch (error) {
        console.log(error)
    }
}