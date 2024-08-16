import { execSync, execFileSync } from 'child_process'

import { IFileSystemService } from '~/core/utils/fileSystem/FileSystemService';

export interface ITerminalService {
  executeCMD(cmd: string): string;
  executeScript(filePath: string, args: string[]): string;
}

export class TerminalService implements ITerminalService {
  constructor(
    private fileSystem: IFileSystemService
  ) { }

  public executeCMD(cmd: string): string {
    try {
      const result = execSync(cmd, { encoding: 'utf-8' });

      return result;
    } catch (error) {
      console.error(`[TerminalService:executeCMD] ExecSync error: ${error}`);
      throw error;
    }
  }

  public executeScript(filePath: string, args: string[] = []): string {
    if (!this.fileSystem.checkFileExistance(filePath)) {
      throw new Error(`[TerminalService:executeScript] File not found: ${filePath}`);
    }

    try {
      if (!this.fileSystem.checkExecutionPermission(filePath)) {
        throw new Error(`[TerminalService:executeScript] File is not executable: ${filePath}`);
      }

      const result = execFileSync(filePath, args, { encoding: 'utf-8' });

      return result;
    } catch (error) {
      console.error(`[TerminalService:executeScript] ExecFileSync error: ${error}`);
      throw error;
    }
  }

}