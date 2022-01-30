import Question from '../models/Question';

export const getBySequence = async (sequence: number): Promise<Question> => {
    const question: Question = await Question.findByPk(sequence);
    if (!question) {
        throw new Error('Could not find question with this sequence.');
    };
    return question;
};

export const isLastQuestion = async (question: Question): Promise<Boolean> => {
    const totalQuestions = await Question.count();
    return (totalQuestions == question.sequence);
};