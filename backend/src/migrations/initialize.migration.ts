import { DataTypes, QueryInterface, Sequelize, Transaction } from 'sequelize';

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
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
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      game_history: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
      }
    }, { transaction });

    await queryInterface.createTable('Videos', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      channel_title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      view_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      like_count: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      comment_count: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      category: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      theme: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, { transaction });
  })
}

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
    await queryInterface.dropTable('Videos', { transaction })
    await queryInterface.dropTable('Users', { transaction })
  })
}