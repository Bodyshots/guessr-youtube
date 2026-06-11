import { Runner } from './runner';
import sequelize from '../models/init';

// Auto execute function for when used in CLI mode
(async () => {
  try {
    const operation: string = process.argv[2];
    const runner = new Runner();
    await runner.execute(operation);
    await sequelize.close();
  } catch (e) {
    console.log(e);
  }
})();