import User from '../models/User'

import { v4 as uuidv4 } from 'uuid';

export const findOrCreate = async (phoneNumber: string) => {
    const [user, created] = await User.findOrCreate({
        where: { phoneNumber: phoneNumber },
        defaults: { currentQuestionSequence : 1, currentInteractionId: uuidv4() },
    });
    return user;
}

export const getByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const user = await User.findByPk(phoneNumber)
    if (!user) {
        throw new Error('Could not find user with this phone number.')
    }
    return user
}