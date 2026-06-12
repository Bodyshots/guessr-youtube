import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import CVSequelize from '../init';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare admin: CreationOptional<boolean>;

  // Attributes
  declare refreshToken: CreationOptional<string | null>;
  declare gameHistoryId: CreationOptional<ForeignKey<string>>;
  declare username: string;
  declare email: string;
  declare password: string;
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
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'refresh_token'
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
  gameHistoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
    field: 'game_history_id'
  }
}, {
  tableName: 'Users',
  sequelize: CVSequelize
});

export default User; 