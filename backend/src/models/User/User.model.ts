import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import CVSequelize from '../init';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare admin: CreationOptional<boolean>;

  // Attributes
  declare username: string;
  declare email: string;
  declare password: string;
  declare gameHistory: Record<number, number>; // temp
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  gameHistory: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
    field: 'game_history'
  }
}, {
  tableName: 'Users',
  sequelize: CVSequelize
});

export default User; 