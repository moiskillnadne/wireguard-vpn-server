import { ITerminalService } from "~/core/utils/terminal/TerminalService";

export class WireguardService {
  constructor(
    private terminalService: ITerminalService
  ) { }

  public getStatus(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName}`);
  }

  public getInterfaces(): string {
    return this.terminalService.executeCMD('wg show interfaces');
  }

  public getPeers(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} peers`);
  }

  public getAllowedIPs(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} allowed-ips`);
  }

  public getLatestHandshake(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} latest-handshakes`);
  }

  public getTransfer(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} transfer`);
  }

  public getKeepalive(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} persistent-keepalive`);
  }

  public getPeerEndpoints(interfaceName: string = 'wg0'): string {
    return this.terminalService.executeCMD(`wg show ${interfaceName} endpoints`);
  }
}