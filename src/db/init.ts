require('dotenv').config()

import User from './models/User'
import Question from './models/Question'
import Answer from './models/Answer'
import sequelizeConnection from '../config/config'

User.hasMany(Answer, { foreignKey: 'phoneNumber' });
Question.hasMany(User, { foreignKey: 'currentQuestionSequence', sourceKey: 'sequence' } );
Answer.belongsTo(Question, { foreignKey: 'questionId' });

const dbInit = () => {
  try {
    sequelizeConnection.sync({ force: false });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
}

export default dbInit;
