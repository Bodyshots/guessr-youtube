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
  declare gameEndTime: Date;
  declare progress: Array<boolean>;
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
  },
  theme: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  progress: {
    type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    allowNull: true
  }
}, {
  tableName: 'Games',
  sequelize: CVSequelize
});

export default Game; 