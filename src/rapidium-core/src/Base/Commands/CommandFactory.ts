import * as fs from 'fs';
import * as path from 'path';
import DataValidationException from '../Exceptions/DataValidationException';
/**
 * class CommandFactory
 */
export class CommandFactory {
  /**
   * @param {objectCommand} objectCommand
   * @param {auto} auto
   * @param {data} data
   * @return {Object} Object
   */
  async getCommand(objectCommand: string, auto = false, data: object) {
    const executablePath = objectCommand.replace('Commands', 'Executables');
    const validationPath = objectCommand.replace('Commands', 'Validations');

    if (fs.existsSync(validationPath)) {
      const finalPath = path.relative(__dirname, validationPath);
      const IsValidator = require(finalPath);
      delete (data as { [key: string]: any })['path'];
      const validaResult = await new IsValidator(data).validate(data);

      if (validaResult == true) {
        return this.getExecutable(executablePath, data);
      } else {
        throw new DataValidationException(validaResult);
      }
    } else if (fs.existsSync(executablePath)) {
      return await this.getExecutable(executablePath, data);
    } else {
      return `${path.basename(executablePath)} Executable Not Found`;
    }
  }
  /**
 * @param {executablePath} executablePath
 * @param {data} data
 * @return {Object} Object
 */
  async getExecutable(executablePath: string, data: object) {
    if (fs.existsSync(executablePath)) {
      const finalPath = path.relative(__dirname, executablePath);
      const Newers = require(finalPath);
      return await new Newers().execute(data);
    }
  }
}
