import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import CVSequelize from '../init';
import Game from '../Game';

class GameHistory extends Model<InferAttributes<GameHistory>, InferCreationAttributes<GameHistory>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Attributes
  declare userId: ForeignKey<string>;
  declare games: Array<Game>;
}

GameHistory.init({
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
  games: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'GameHistories',
  sequelize: CVSequelize
});

export default GameHistory;