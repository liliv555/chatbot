import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../../config/config';

interface UserAttributes {
  phoneNumber: string;
  currentQuestionSequence: number;
  currentInteractionId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'phoneNumber'> {};
// export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public phoneNumber!: string;
    public currentQuestionSequence: number;
    public currentInteractionId: string;
  
    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};
  
User.init({
  phoneNumber: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  currentQuestionSequence: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  currentInteractionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  modelName: 'User'
});
  
export default User;