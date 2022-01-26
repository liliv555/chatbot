import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../../config/config';

interface AnswerAttributes {
  phoneNumber: string;
  questionId: number;
  interactionId: string;
  answerText: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'phoneNumber' | 'questionId' | 'interactionId'> {}

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
    public phoneNumber!: string
    public questionId!: number
    public interactionId!: string
    public answerText!: string
  
    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
  
Answer.init({
    phoneNumber: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    interactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    answerText: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: 'Answer'
})

export default Answer