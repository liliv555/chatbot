import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../../config/config';

export enum Types {
    Text = 'text',
    Date = 'date',
    Option = 'option'
};

interface QuestionAttributes {
  questionId: number;
  sequence: number;
  questionText: string;
  questionType: Types
};

export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'questionId'> {};

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    public questionId!: number
    public sequence!: number
    public questionText!: string
    public questionType!: Types
};
  
Question.init({
    questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    questionText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questionType: {
        type: DataTypes.ENUM('text', 'date', 'option'),
        allowNull: false,
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    modelName: 'Question'
});
  
export default Question;