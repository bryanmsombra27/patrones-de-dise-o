import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LocalLogger Class
export class LocalLogger {
  constructor(private file: string) {}

  writeLog(msg: string): void {
    console.log(`${this.file} %cLOG] ${msg}`, COLORS.blue);
  }
  writeError(msg: string): void {
    console.log(`${this.file} %cERROR ] ${msg}`, COLORS.red);
  }
  writeWarn(msg: string): void {
    console.log(`${this.file} %cWARN] ${msg}`, COLORS.yellow);
  }
}
