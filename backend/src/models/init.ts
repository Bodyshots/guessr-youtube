
import fs from 'fs';
import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

import CONFIG from '../config/config';
import MIGRATION_CONFIG from '../config/migration-config';

export class SequelizeInit {
  private static instance: SequelizeInit; // Singleton
  private sequelize: Sequelize;

  private constructor() {
    const isMigration = process.env.ENVIRONMENT === 'migration'
    const sequelizeOptions = {
      port: isMigration ? MIGRATION_CONFIG.DB_PORT : CONFIG.DB_PORT,
      host: isMigration ? MIGRATION_CONFIG.DB_HOST : CONFIG.DB_HOST,
      dialect: 'postgres' as Dialect,
      logging: console.log
    };
    this.sequelize = new Sequelize(CONFIG.DB_NAME, CONFIG.DB_USERNAME, CONFIG.DB_PASSWORD, sequelizeOptions);
  }

  public static getSequelizeInstance(): Sequelize {
    if (!SequelizeInit.instance) {
      SequelizeInit.instance = new SequelizeInit();
    }
    return SequelizeInit.instance.sequelize;
  }

  private static async initializeModels() {
    const modelsDir = `${__dirname}`;
    const modelNames = fs.readdirSync(modelsDir);
    for (const modelName of modelNames) {
      const importPath = `${__dirname}/models/${modelName}/index`;
      if (fs.existsSync(`${importPath}.ts`) || fs.existsSync(`${importPath}.js`)) {
        await import(importPath);
      }
    }
  }

  private static async initializeAssociations() {
    const models = SequelizeInit.getSequelizeInstance().models;
    for (const modelName of Object.keys(models)) {
      const importPath = `${__dirname}/models/${modelName}/${modelName}.associations`;
      if (fs.existsSync(`${importPath}.ts`) || fs.existsSync(`${importPath}.js`)) {
        await import(importPath);
      }
    }
  }

  public static async run() {
    await this.initializeModels();
    await this.initializeAssociations();
    await this.getSequelizeInstance().validate();
  }
}

export default SequelizeInit.getSequelizeInstance();