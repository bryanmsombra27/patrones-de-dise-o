import { Logger } from "@deno-library/logger";
import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LoggerAdapter
interface ILoggerAdapter {
  file: string;
  writeLog(msg: string): void;
  writeError(msg: string): void;
  writeWarn(msg: string): void;
  //   writeLog: (msg: string) => void;
  //   writeWarn: (msg: string) => void;
  //   writeError: (msg: string) => void;
}

// const logger = new Logger();

// logger.info("");
// logger.warn("");
// logger.error("");

export class LoggerAdapter implements ILoggerAdapter {
  file: string;
  private logger: Logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.info(`${this.file} LOG] ${msg}`);
  }

  writeError(msg: string): void {
    this.logger.error(`${this.file} WARN] ${msg}`);
  }
  writeWarn(msg: string): void {
    this.logger.warn(`${this.file} ERROR] ${msg}`);
  }
}
