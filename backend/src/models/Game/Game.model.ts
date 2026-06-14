import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import CVSequelize from '../init';

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare gameStartTime: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Attributes
  declare userId: ForeignKey<string>;
  declare theme: string;
  declare gameMode: string;
  declare gameEndTime: CreationOptional<Date>;
  declare guesses: Array<String>;
  declare statuses: Array<Boolean>
}

Game.init({
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
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id'
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gameMode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'game_mode',
  },
  gameStartTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'game_start_time'
  },
  gameEndTime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'game_end_time'
  },
  guesses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  statuses: {
    type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    allowNull: false
  }
}, {
  tableName: 'Games',
  sequelize: CVSequelize
});

export default Game; 