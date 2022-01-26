import Answer from '../models/Answer'

export const create = async (phoneNumber: string, questionId: number, interactionId: string, answerText: string): Promise<Answer> => {
  try {
    const answer = await Answer.create({
      phoneNumber: phoneNumber,
      questionId: questionId,
      interactionId: interactionId,
      answerText: answerText
    });
    return answer;
  } catch (error) {
    console.log(error)
  }
}