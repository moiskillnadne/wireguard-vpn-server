import { existsSync, accessSync, constants } from 'fs';

export interface IFileSystemService {
  checkFileExistance(filePath: string): boolean;
  checkExecutionPermission(filePath: string): boolean;
}

export class FileSystemService implements IFileSystemService {
  constructor() { }

  public checkFileExistance(filePath: string): boolean {
    return existsSync(filePath);
  }

  public checkExecutionPermission(filePath: string): boolean {
    try {
      accessSync(filePath, constants.X_OK);
      return true
    } catch (error) {
      console.error(`[FileSystemService:checkExecutionPermission] AccessSync error: ${error}`);
      return false;
    }
  }
}