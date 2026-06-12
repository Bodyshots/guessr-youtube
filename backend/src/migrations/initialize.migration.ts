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
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      game_history_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
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

    await queryInterface.createTable('Games', {
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false
      },
      game_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      game_end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      progress: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: true,
      }
    }, { transaction })

    await queryInterface.createTable('GameHistories', {
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      games: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
      }
    }, { transaction })
  })
}


export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
    await queryInterface.dropTable('Games', { transaction })
    await queryInterface.dropTable('GameHistories', { transaction })
    await queryInterface.dropTable('Videos', { transaction })
    await queryInterface.dropTable('Users', { transaction })
  })
}