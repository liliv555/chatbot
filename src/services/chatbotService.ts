import * as userDal from '../db/dal/user';
import * as questionDal from '../db/dal/question';

import Question from '../db/models/Question';
import User from '../db/models/User';

import { v4 as uuidv4 } from 'uuid';

const findOrCreateUser = (phoneNumber: string): Promise<User> => {
  return userDal.findOrCreate(phoneNumber);
};

export const getQuestionBySequence = (sequence: number): Promise<Question> => {
  return questionDal.getBySequence(sequence);
};

const phoneValidation = (phoneNumber: string): Boolean => {
  // validation for spanish phone numbers
  const phoneRegex: RegExp = new RegExp('^\\+34(?:6[0-9]|7[1-9])[0-9]{7}$');
  return (phoneRegex.test(phoneNumber));
};

export const startChatbot = async (phoneNumber: string): Promise<string> => {
  // if phone number is not valid throws an error with 500 status
  try {
    if (!phoneValidation(phoneNumber)) {
      throw ({ status: 500, code: 'PHONE_NUMBER_NOT_VALID', message: 'Phone number is not valid.' });
    };
    //  finds or creates the user, sets the current question sequence to 1 and generates a new interaction id
    const currentUser: User = await findOrCreateUser(phoneNumber);
    currentUser.currentQuestionSequence = 1;
    currentUser.currentInteractionId = uuidv4();
    await currentUser.save();
    // query for the first question
    const questionText: string = (await getQuestionBySequence(currentUser.currentQuestionSequence)).questionText;
    return questionText;
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
};