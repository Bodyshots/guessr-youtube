import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from '../models/init';
import path from 'path';

export class Runner {
  declare umzug;

  constructor() {
    this.umzug = new Umzug({
      migrations: { glob: path.resolve(__dirname, '*.migration.{ts,js}') },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: undefined,
    });
  }

  public async execute(operation: string) {
    switch (operation) {
      case 'status': {
        await this.printStatus();
        break;
      }
      case 'up': {
        console.log('Running migrations up');
        await this.umzug.up();
        console.log('Completed running migrations');
        await this.printStatus();
        break;
      }
      case 'down': {
        console.log('Running migrations down');
        await this.umzug.down({ step: (await this.umzug.executed()).length });
        console.log('Completed downing migrations');
        await this.printStatus();
        break;
      }
      default:
        console.log('Invalid option');
    }
    return;
  }

  private async printStatus() {
    console.log({
      completed: (await this.umzug.executed()).map(migration => migration.name),
      pending: (await this.umzug.pending()).map(migration => migration.name),
    });
  }
}