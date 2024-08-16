import { execSync, execFileSync } from 'child_process';
import { TerminalService } from './TerminalService';

import { IFileSystemService } from '~/core/utils/fileSystem/FileSystemService';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
  execFileSync: jest.fn(),
}));

describe('TerminalService', () => {
  let terminalService: TerminalService;
  let mockFileSystemService: IFileSystemService;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    // Mock IFileSystemService
    mockFileSystemService = {
      checkFileExistance: jest.fn(),
      checkExecutionPermission: jest.fn(),
    };

    terminalService = new TerminalService(mockFileSystemService);

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  describe('executeCMD', () => {
    it('should execute a command and return the output', () => {
      (execSync as jest.Mock).mockReturnValue('Command output');

      const result = terminalService.executeCMD('echo "Hello, world!"');

      expect(execSync).toHaveBeenCalledWith('echo "Hello, world!"', { encoding: 'utf-8' });
      expect(result).toBe('Command output');
    });

    it('should throw an error if the command fails', () => {
      (execSync as jest.Mock).mockImplementation(() => {
        throw new Error('Command failed');
      });

      expect(() => terminalService.executeCMD('invalid command')).toThrow('Command failed');
      expect(execSync).toHaveBeenCalledWith('invalid command', { encoding: 'utf-8' });
    });
  });

  describe('executeScript', () => {
    it('should execute a script with arguments and return the output', () => {
      (mockFileSystemService.checkFileExistance as jest.Mock).mockReturnValue(true);
      (mockFileSystemService.checkExecutionPermission as jest.Mock).mockReturnValue(true);
      (execFileSync as jest.Mock).mockReturnValue('Script output');

      const result = terminalService.executeScript('./test_script.sh', ['arg1', 'arg2']);

      expect(mockFileSystemService.checkFileExistance).toHaveBeenCalledWith('./test_script.sh');
      expect(mockFileSystemService.checkExecutionPermission).toHaveBeenCalledWith('./test_script.sh');
      expect(execFileSync).toHaveBeenCalledWith('./test_script.sh', ['arg1', 'arg2'], { encoding: 'utf-8' });
      expect(result).toBe('Script output');
    });

    it('should throw an error if the script does not exist', () => {
      (mockFileSystemService.checkFileExistance as jest.Mock).mockReturnValue(false);

      expect(() => terminalService.executeScript('./missing_script.sh')).toThrow(
        '[TerminalService:executeScript] File not found: ./missing_script.sh'
      );
      expect(mockFileSystemService.checkFileExistance).toHaveBeenCalledWith('./missing_script.sh');
      expect(execFileSync).not.toHaveBeenCalled();
    });

    it('should throw an error if the script is not executable', () => {
      (mockFileSystemService.checkFileExistance as jest.Mock).mockReturnValue(true);
      (mockFileSystemService.checkExecutionPermission as jest.Mock).mockReturnValue(false);

      expect(() => terminalService.executeScript('./test_script.sh')).toThrow(
        '[TerminalService:executeScript] File is not executable: ./test_script.sh'
      );
      expect(mockFileSystemService.checkFileExistance).toHaveBeenCalledWith('./test_script.sh');
      expect(mockFileSystemService.checkExecutionPermission).toHaveBeenCalledWith('./test_script.sh');
      expect(execFileSync).not.toHaveBeenCalled();
    });

    it('should throw an error if the script execution fails', () => {
      (mockFileSystemService.checkFileExistance as jest.Mock).mockReturnValue(true);
      (mockFileSystemService.checkExecutionPermission as jest.Mock).mockReturnValue(true);
      (execFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('Script execution failed');
      });

      expect(() => terminalService.executeScript('./test_script.sh')).toThrow('Script execution failed');
      expect(execFileSync).toHaveBeenCalledWith('./test_script.sh', [], { encoding: 'utf-8' });
    });
  });
});