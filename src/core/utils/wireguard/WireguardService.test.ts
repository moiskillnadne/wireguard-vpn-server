import { WireguardService } from './WireguardService';
import { ITerminalService } from '~/core/utils/terminal/TerminalService';

describe('WireguardService', () => {
  let wireguardService: WireguardService;
  let mockTerminalService: ITerminalService;

  beforeEach(() => {
    // Mock ITerminalService
    mockTerminalService = {
      executeCMD: jest.fn(),
      executeScript: jest.fn(),
    };

    wireguardService = new WireguardService(mockTerminalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStatus', () => {
    it('should execute the correct command to get the status of the interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('wg show output');

      const result = wireguardService.getStatus('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0');
      expect(result).toBe('wg show output');
    });

    it('should use the default interface name if none is provided', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('wg show output');

      const result = wireguardService.getStatus();

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0');
      expect(result).toBe('wg show output');
    });
  });

  describe('getInterfaces', () => {
    it('should execute the correct command to get all interfaces', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('wg0\nwg1');

      const result = wireguardService.getInterfaces();

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show interfaces');
      expect(result).toBe('wg0\nwg1');
    });
  });

  describe('getPeers', () => {
    it('should execute the correct command to get peers for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('peer1\npeer2');

      const result = wireguardService.getPeers('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 peers');
      expect(result).toBe('peer1\npeer2');
    });
  });

  describe('getAllowedIPs', () => {
    it('should execute the correct command to get allowed IPs for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('10.0.0.1/32\n10.0.0.2/32');

      const result = wireguardService.getAllowedIPs('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 allowed-ips');
      expect(result).toBe('10.0.0.1/32\n10.0.0.2/32');
    });
  });

  describe('getLatestHandshake', () => {
    it('should execute the correct command to get the latest handshake for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('42\n120');

      const result = wireguardService.getLatestHandshake('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 latest-handshakes');
      expect(result).toBe('42\n120');
    });
  });

  describe('getTransfer', () => {
    it('should execute the correct command to get transfer data for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('50.3 MiB received\n120.5 MiB sent');

      const result = wireguardService.getTransfer('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 transfer');
      expect(result).toBe('50.3 MiB received\n120.5 MiB sent');
    });
  });

  describe('getKeepalive', () => {
    it('should execute the correct command to get persistent keepalive settings for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('every 25 seconds');

      const result = wireguardService.getKeepalive('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 persistent-keepalive');
      expect(result).toBe('every 25 seconds');
    });
  });

  describe('getPeerEndpoints', () => {
    it('should execute the correct command to get peer endpoints for the given interface', () => {
      (mockTerminalService.executeCMD as jest.Mock).mockReturnValue('213.240.26.202:5250\n192.168.1.1:51820');

      const result = wireguardService.getPeerEndpoints('wg0');

      expect(mockTerminalService.executeCMD).toHaveBeenCalledWith('wg show wg0 endpoints');
      expect(result).toBe('213.240.26.202:5250\n192.168.1.1:51820');
    });
  });
});