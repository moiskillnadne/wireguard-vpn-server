import { existsSync, accessSync, constants } from 'fs';
import { FileSystemService } from './FileSystemService';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  accessSync: jest.fn(),
  constants: {
    X_OK: 1,
  },
}));

describe('FileSystemService', () => {
  let fileSystemService: FileSystemService;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    fileSystemService = new FileSystemService();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  describe('checkFileExistance', () => {
    it('should return true if the file exists', () => {
      (existsSync as jest.Mock).mockReturnValue(true);

      const result = fileSystemService.checkFileExistance('./test_file.txt');

      expect(existsSync).toHaveBeenCalledWith('./test_file.txt');
      expect(result).toBe(true);
    });

    it('should return false if the file does not exist', () => {
      (existsSync as jest.Mock).mockReturnValue(false);

      const result = fileSystemService.checkFileExistance('./missing_file.txt');

      expect(existsSync).toHaveBeenCalledWith('./missing_file.txt');
      expect(result).toBe(false);
    });
  });

  describe('checkExecutionPermission', () => {
    it('should return true if the file is executable', () => {
      (accessSync as jest.Mock).mockImplementation(() => true);

      const result = fileSystemService.checkExecutionPermission('./test_file.sh');

      expect(accessSync).toHaveBeenCalledWith('./test_file.sh', constants.X_OK);
      expect(result).toBe(true);
    });

    it('should return false if the file is not executable', () => {
      (accessSync as jest.Mock).mockImplementation(() => {
        throw new Error('No execute permissions');
      });

      const result = fileSystemService.checkExecutionPermission('./non_executable_file.sh');

      expect(accessSync).toHaveBeenCalledWith('./non_executable_file.sh', constants.X_OK);
      expect(result).toBe(false);
    });
  });
});