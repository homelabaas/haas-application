import * as yaml from "js-yaml";

const dhcpYaml = {
    version: 2,
    ethernets: {
        ens192: {
            dhcp4: true
        }
    }
};

const staticNetworkYaml = (ipAddress: string, gateway: string, DNS1: string, DNS2: string) => {  return {
    version: 2,
    ethernets: {
      ens192: {
        dhcp4: false,
        addresses: [ ipAddress ], // x.x.x.x/x format
        gateway4: gateway,
        nameservers: {
          addresses: [DNS1, DNS2]
        }
      }
    }
  };
};

export enum NetworkType {
    Static,
    DHCP
}

export class NetworkConfiguration {

    public GetNetworkConfigYamlStaticIp = (ip: string, gateway: string, dns1: string, dns2: string): string => {
        return yaml.safeDump(staticNetworkYaml(ip, gateway, dns1, dns2));
    }

    public GetNetworkConfigYamlDHCP = (): string => {
        return yaml.safeDump(dhcpYaml);
    }
}
