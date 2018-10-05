declare module vspherecis {
       interface cisService {
      addHandler(handler: Function): void;
      removeHandler(handler: Function): void;
      serializeObject(obj: Object, name: string): Object;
      deserializeObject(obj: Object): Object;
      getSecurityContext(): Object;
      setSecurityContext(securityContext: Object): void;
      uuid(): string;
      builtin: {
         ANYERROR: {
            (options?: cisService.builtin.ANYERROR): cisService.builtin.ANYERROR;
         };
         BINARY: {
            (options?: cisService.builtin.BINARY): cisService.builtin.BINARY;
         };
         BOOLEAN: {
            (options?: cisService.builtin.BOOLEAN): cisService.builtin.BOOLEAN;
         };
         DATETIME: {
            (options?: cisService.builtin.DATETIME): cisService.builtin.DATETIME;
         };
         DOUBLE: {
            (options?: cisService.builtin.DOUBLE): cisService.builtin.DOUBLE;
         };
         DYNAMICSTRUCTURE: {
            (options?: cisService.builtin.DYNAMICSTRUCTURE): cisService.builtin.DYNAMICSTRUCTURE;
         };
         ID: {
            (options?: cisService.builtin.ID): cisService.builtin.ID;
         };
         LONG: {
            (options?: cisService.builtin.LONG): cisService.builtin.LONG;
         };
         OPAQUE: {
            (options?: cisService.builtin.OPAQUE): cisService.builtin.OPAQUE;
         };
         SECRET: {
            (options?: cisService.builtin.SECRET): cisService.builtin.SECRET;
         };
         STRING: {
            (options?: cisService.builtin.STRING): cisService.builtin.STRING;
         };
         URI: {
            (options?: cisService.builtin.URI): cisService.builtin.URI;
         };
         VOID: {
            (options?: cisService.builtin.VOID): cisService.builtin.VOID;
         };
      }
      applmgmt: {
         access: {
            consolecli: {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
            shell: {
               set(config: cisService.applmgmt.access.shell.ShellConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.access.shell.ShellConfig>;
               ShellConfig: {
                  (options?: cisService.applmgmt.access.shell.ShellConfig): cisService.applmgmt.access.shell.ShellConfig;
               };
            }
            dcui: {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
            ssh: {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
         }
         techpreview: {
            system: {
               update: {
                  set(config: cisService.applmgmt.techpreview.system.update.UpdateStructSet): Promise<void>;
                  get(): Promise<cisService.applmgmt.techpreview.system.update.UpdateStructGet>;
                  UpdateDay: {
                     "Monday": string;
                     "Tuesday": string;
                     "Friday": string;
                     "Wednesday": string;
                     "Thursday": string;
                     "Saturday": string;
                     "Sunday": string;
                     "Everyday": string;
                  };
                  AutoUpdateNotification: {
                     "disabled": string;
                     "enabled": string;
                  };
                  UpdateStructSet: {
                     (options?: cisService.applmgmt.techpreview.system.update.UpdateStructSet): cisService.applmgmt.techpreview.system.update.UpdateStructSet;
                  };
                  UpdateStructGet: {
                     (options?: cisService.applmgmt.techpreview.system.update.UpdateStructGet): cisService.applmgmt.techpreview.system.update.UpdateStructGet;
                  };
               }
            }
            monitoring: {
               snmp: {
                  set(config: cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfig): Promise<void>;
                  test(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPTestResults>;
                  stats(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPStats>;
                  enable(): Promise<void>;
                  disable(): Promise<void>;
                  get(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfigReadOnly>;
                  reset(): Promise<void>;
                  hash(config: cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashConfig): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashResults>;
                  limits(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPLimits>;
                  SNMPv3Notfication: {
                     "inform": string;
                     "trap": string;
                  };
                  SNMPPrivProto: {
                     "AES128": string;
                     "none": string;
                  };
                  SNMPAuthProto: {
                     "none": string;
                     "SHA1": string;
                     "MD5": string;
                  };
                  SNMPSecLevel: {
                     "none": string;
                     "auth": string;
                     "priv": string;
                  };
                  SNMPConfigReadOnly: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfigReadOnly): cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfigReadOnly;
                  };
                  SNMPConfig: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfig): cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfig;
                  };
                  SNMPv3Target: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPv3Target): cisService.applmgmt.techpreview.monitoring.snmp.SNMPv3Target;
                  };
                  SNMPLimits: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPLimits): cisService.applmgmt.techpreview.monitoring.snmp.SNMPLimits;
                  };
                  SNMPUser: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPUser): cisService.applmgmt.techpreview.monitoring.snmp.SNMPUser;
                  };
                  SNMPStats: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPStats): cisService.applmgmt.techpreview.monitoring.snmp.SNMPStats;
                  };
                  SNMPv1TrapTarget: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPv1TrapTarget): cisService.applmgmt.techpreview.monitoring.snmp.SNMPv1TrapTarget;
                  };
                  SNMPTestResults: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPTestResults): cisService.applmgmt.techpreview.monitoring.snmp.SNMPTestResults;
                  };
                  SNMPRemoteUser: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPRemoteUser): cisService.applmgmt.techpreview.monitoring.snmp.SNMPRemoteUser;
                  };
                  SNMPHashConfig: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashConfig): cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashConfig;
                  };
                  SNMPHashResults: {
                     (options?: cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashResults): cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashResults;
                  };
               }
            }
            localaccounts: {
               user: {
                  add(config: cisService.applmgmt.techpreview.localaccounts.user.NewUserConfig): Promise<void>;
                  set(config: cisService.applmgmt.techpreview.localaccounts.user.UserConfig): Promise<void>;
                  get(username: string): Promise<cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet>>;
                  delete(username: string): Promise<void>;
                  UserPasswordStatus: {
                     "notset": string;
                     "expired": string;
                     "valid": string;
                  };
                  UserAccountStatus: {
                     "disabled": string;
                     "enabled": string;
                  };
                  UserRole: {
                     "admin": string;
                     "operator": string;
                     "superAdmin": string;
                  };
                  NewUserConfig: {
                     (options?: cisService.applmgmt.techpreview.localaccounts.user.NewUserConfig): cisService.applmgmt.techpreview.localaccounts.user.NewUserConfig;
                  };
                  UserConfig: {
                     (options?: cisService.applmgmt.techpreview.localaccounts.user.UserConfig): cisService.applmgmt.techpreview.localaccounts.user.UserConfig;
                  };
                  UserConfigGet: {
                     (options?: cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet): cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet;
                  };
               }
            }
            networking: {
               proxy: {
                  set(config: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple): Promise<void>;
                  test(config: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigTest): Promise<cisService.applmgmt.techpreview.networking.proxy.TestStatusInfo>;
                  get(): Promise<cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple>;
                  delete(protocol: cisService.applmgmt.techpreview.networking.proxy.ProxyProtocol): Promise<void>;
                  TestStatus: {
                     "orange": string;
                     "green": string;
                     "red": string;
                  };
                  ProxyProtocol: {
                     "ftp": string;
                     "http": string;
                     "https": string;
                  };
                  MessageStatus: {
                     "failure": string;
                     "success": string;
                  };
                  ProxyStatus: {
                     "disabled": string;
                     "enabled": string;
                  };
                  TestStatusInfo: {
                     (options?: cisService.applmgmt.techpreview.networking.proxy.TestStatusInfo): cisService.applmgmt.techpreview.networking.proxy.TestStatusInfo;
                  };
                  Message: {
                     (options?: cisService.applmgmt.techpreview.networking.proxy.Message): cisService.applmgmt.techpreview.networking.proxy.Message;
                  };
                  ProxyConfigMultiple: {
                     (options?: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple): cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple;
                  };
                  ProxyConfig: {
                     (options?: cisService.applmgmt.techpreview.networking.proxy.ProxyConfig): cisService.applmgmt.techpreview.networking.proxy.ProxyConfig;
                  };
                  ProxyConfigTest: {
                     (options?: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigTest): cisService.applmgmt.techpreview.networking.proxy.ProxyConfigTest;
                  };
               }
               ipv4: {
                  set(config: Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4Config>): Promise<void>;
                  get(interfaces: Array<string>): Promise<Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly>>;
                  renew(interfaces: Array<string>): Promise<void>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly>>;
                  IPv4Mode: {
                     "dhcp": string;
                     "is_static": string;
                     "unconfigured": string;
                  };
                  IPv4ConfigReadOnly: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly): cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly;
                  };
                  IPv4Config: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv4.IPv4Config): cisService.applmgmt.techpreview.networking.ipv4.IPv4Config;
                  };
               }
               ipv6: {
                  set(config: Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6Config>): Promise<void>;
                  get(interfaces: Array<string>): Promise<Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly>>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly>>;
                  IPv6AddressStatus: {
                     "tentative": string;
                     "unknown": string;
                     "inaccessible": string;
                     "invalid": string;
                     "duplicate": string;
                     "preferred": string;
                     "deprecated": string;
                     "optimistic": string;
                  };
                  IPv6AddressOrigin: {
                     "dhcp": string;
                     "random": string;
                     "manual": string;
                     "other": string;
                     "linklayer": string;
                  };
                  IPv6ConfigReadOnly: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly): cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly;
                  };
                  IPv6Config: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv6.IPv6Config): cisService.applmgmt.techpreview.networking.ipv6.IPv6Config;
                  };
                  IPv6Address: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv6.IPv6Address): cisService.applmgmt.techpreview.networking.ipv6.IPv6Address;
                  };
                  IPv6AddressReadOnly: {
                     (options?: cisService.applmgmt.techpreview.networking.ipv6.IPv6AddressReadOnly): cisService.applmgmt.techpreview.networking.ipv6.IPv6AddressReadOnly;
                  };
               }
               routes: {
                  add(route: cisService.applmgmt.techpreview.networking.routes.Route): Promise<void>;
                  set(routes: Array<cisService.applmgmt.techpreview.networking.routes.Route>): Promise<void>;
                  test(gateways: Array<string>): Promise<cisService.applmgmt.techpreview.networking.routes.TestStatusInfo>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.routes.RouteReadOnly>>;
                  delete(route: cisService.applmgmt.techpreview.networking.routes.Route): Promise<void>;
                  MessageStatus: {
                     "failure": string;
                     "success": string;
                  };
                  TestStatus: {
                     "orange": string;
                     "green": string;
                     "red": string;
                  };
                  TestStatusInfo: {
                     (options?: cisService.applmgmt.techpreview.networking.routes.TestStatusInfo): cisService.applmgmt.techpreview.networking.routes.TestStatusInfo;
                  };
                  RouteReadOnly: {
                     (options?: cisService.applmgmt.techpreview.networking.routes.RouteReadOnly): cisService.applmgmt.techpreview.networking.routes.RouteReadOnly;
                  };
                  Message: {
                     (options?: cisService.applmgmt.techpreview.networking.routes.Message): cisService.applmgmt.techpreview.networking.routes.Message;
                  };
                  Route: {
                     (options?: cisService.applmgmt.techpreview.networking.routes.Route): cisService.applmgmt.techpreview.networking.routes.Route;
                  };
               }
               firewall: {
                  addr: {
                     inbound: {
                        add(pos: number, rule: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule): Promise<void>;
                        set(rules: Array<cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule>): Promise<void>;
                        list(): Promise<Array<cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule>>;
                        delete(config: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.DeleteFirewallRule): Promise<void>;
                        FirewallRulePolicy: {
                           "deny": string;
                           "allow": string;
                        };
                        FirewallAddressRule: {
                           (options?: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule): cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule;
                        };
                        DeleteFirewallRule: {
                           (options?: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.DeleteFirewallRule): cisService.applmgmt.techpreview.networking.firewall.addr.inbound.DeleteFirewallRule;
                        };
                     }
                  }
               }
            }
            services: {
               status: {
                  get(name: string, timeout: number): Promise<cisService.applmgmt.techpreview.services.status.ServiceStatus>;
                  ServiceStatus: {
                     "down": string;
                     "up": string;
                  };
               }
               stop(name: string, timeout: number): Promise<void>;
               restart(name: string, timeout: number): Promise<void>;
               control(args: Array<string>, name: string, timeout: number): Promise<void>;
               list(): Promise<Array<cisService.applmgmt.techpreview.services.ServiceInfo>>;
               ServiceOps: {
                  "control": string;
                  "status": string;
                  "stop": string;
                  "restart": string;
               };
               ServiceInfo: {
                  (options?: cisService.applmgmt.techpreview.services.ServiceInfo): cisService.applmgmt.techpreview.services.ServiceInfo;
               };
            }
            ntp: {
               server: {
                  add(servers: Array<string>): Promise<void>;
                  set(servers: Array<string>): Promise<void>;
                  delete(servers: Array<string>): Promise<void>;
               }
               test(servers: Array<string>): Promise<cisService.applmgmt.techpreview.ntp.TestStatusInfo>;
               get(): Promise<cisService.applmgmt.techpreview.ntp.NTPConfig>;
               NTPStatus: {
                  "Down": string;
                  "Unknown": string;
                  "Up": string;
               };
               TestStatus: {
                  "orange": string;
                  "green": string;
                  "red": string;
               };
               MessageStatus: {
                  "failure": string;
                  "success": string;
               };
               TestStatusInfo: {
                  (options?: cisService.applmgmt.techpreview.ntp.TestStatusInfo): cisService.applmgmt.techpreview.ntp.TestStatusInfo;
               };
               Message: {
                  (options?: cisService.applmgmt.techpreview.ntp.Message): cisService.applmgmt.techpreview.ntp.Message;
               };
               NTPConfig: {
                  (options?: cisService.applmgmt.techpreview.ntp.NTPConfig): cisService.applmgmt.techpreview.ntp.NTPConfig;
               };
            }
            shutdown: {
               cancel(): Promise<void>;
               reboot(config: cisService.applmgmt.techpreview.shutdown.ShutdownConfig): Promise<void>;
               poweroff(config: cisService.applmgmt.techpreview.shutdown.ShutdownConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.techpreview.shutdown.ShutdownGetConfig>;
               ShutdownConfig: {
                  (options?: cisService.applmgmt.techpreview.shutdown.ShutdownConfig): cisService.applmgmt.techpreview.shutdown.ShutdownConfig;
               };
               ShutdownGetConfig: {
                  (options?: cisService.applmgmt.techpreview.shutdown.ShutdownGetConfig): cisService.applmgmt.techpreview.shutdown.ShutdownGetConfig;
               };
            }
            timesync: {
               set(config: cisService.applmgmt.techpreview.timesync.TimeSyncConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.techpreview.timesync.TimeSyncConfig>;
               TimeSyncMode: {
                  "Disabled": string;
                  "NTP": string;
                  "host": string;
               };
               TimeSyncConfig: {
                  (options?: cisService.applmgmt.techpreview.timesync.TimeSyncConfig): cisService.applmgmt.techpreview.timesync.TimeSyncConfig;
               };
            }
         }
         health: {
            load: {
               get(): Promise<cisService.applmgmt.health.load.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            system: {
               lastcheck(): Promise<Date>;
               get(): Promise<cisService.applmgmt.health.system.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            databasestorage: {
               get(): Promise<cisService.applmgmt.health.databasestorage.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            swap: {
               get(): Promise<cisService.applmgmt.health.swap.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            applmgmt: {
               get(): Promise<string>;
            }
            softwarepackages: {
               get(): Promise<cisService.applmgmt.health.softwarepackages.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            storage: {
               get(): Promise<cisService.applmgmt.health.storage.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
            mem: {
               get(): Promise<cisService.applmgmt.health.mem.HealthLevel>;
               HealthLevel: {
                  "orange": string;
                  "gray": string;
                  "green": string;
                  "red": string;
                  "yellow": string;
               };
            }
         }
         networking: {
            interfaces: {
               get(interfaceName: string): Promise<cisService.applmgmt.networking.interfaces.InterfaceInfo>;
               list(): Promise<Array<cisService.applmgmt.networking.interfaces.InterfaceInfo>>;
               InterfaceStatus: {
                  "down": string;
                  "up": string;
               };
               InterfaceInfo: {
                  (options?: cisService.applmgmt.networking.interfaces.InterfaceInfo): cisService.applmgmt.networking.interfaces.InterfaceInfo;
               };
            }
            dns: {
               hostname: {
                  set(name: string): Promise<void>;
                  test(name: string): Promise<cisService.applmgmt.networking.dns.hostname.TestStatusInfo>;
                  get(): Promise<string>;
                  MessageStatus: {
                     "failure": string;
                     "success": string;
                  };
                  TestStatus: {
                     "orange": string;
                     "green": string;
                     "red": string;
                  };
                  Message: {
                     (options?: cisService.applmgmt.networking.dns.hostname.Message): cisService.applmgmt.networking.dns.hostname.Message;
                  };
                  TestStatusInfo: {
                     (options?: cisService.applmgmt.networking.dns.hostname.TestStatusInfo): cisService.applmgmt.networking.dns.hostname.TestStatusInfo;
                  };
               }
               domains: {
                  add(domain: string): Promise<void>;
                  set(domains: Array<string>): Promise<void>;
                  list(): Promise<Array<string>>;
               }
               servers: {
                  add(server: string): Promise<void>;
                  set(config: cisService.applmgmt.networking.dns.servers.DNSServerConfig): Promise<void>;
                  test(servers: Array<string>): Promise<cisService.applmgmt.networking.dns.servers.TestStatusInfo>;
                  get(): Promise<cisService.applmgmt.networking.dns.servers.DNSServerConfig>;
                  DNSServerMode: {
                     "dhcp": string;
                     "is_static": string;
                  };
                  TestStatus: {
                     "orange": string;
                     "green": string;
                     "red": string;
                  };
                  MessageStatus: {
                     "failure": string;
                     "success": string;
                  };
                  DNSServerConfig: {
                     (options?: cisService.applmgmt.networking.dns.servers.DNSServerConfig): cisService.applmgmt.networking.dns.servers.DNSServerConfig;
                  };
                  Message: {
                     (options?: cisService.applmgmt.networking.dns.servers.Message): cisService.applmgmt.networking.dns.servers.Message;
                  };
                  TestStatusInfo: {
                     (options?: cisService.applmgmt.networking.dns.servers.TestStatusInfo): cisService.applmgmt.networking.dns.servers.TestStatusInfo;
                  };
               }
            }
         }
         monitoring: {
            query(item: cisService.applmgmt.monitoring.MonitoredItemDataRequest): Promise<Array<cisService.applmgmt.monitoring.MonitoredItemData>>;
            get(statId: string): Promise<cisService.applmgmt.monitoring.MonitoredItem>;
            list(): Promise<Array<cisService.applmgmt.monitoring.MonitoredItem>>;
            IntervalType: {
               "MINUTES30": string;
               "HOURS2": string;
               "MINUTES5": string;
               "DAY1": string;
               "HOURS6": string;
            };
            FunctionType: {
               "COUNT": string;
               "MAX": string;
               "AVG": string;
               "MIN": string;
            };
            MonitoredItemDataRequest: {
               (options?: cisService.applmgmt.monitoring.MonitoredItemDataRequest): cisService.applmgmt.monitoring.MonitoredItemDataRequest;
            };
            MonitoredItem: {
               (options?: cisService.applmgmt.monitoring.MonitoredItem): cisService.applmgmt.monitoring.MonitoredItem;
            };
            MonitoredItemData: {
               (options?: cisService.applmgmt.monitoring.MonitoredItemData): cisService.applmgmt.monitoring.MonitoredItemData;
            };
         }
         system: {
            storage: {
               resize(): Promise<void>;
               list(): Promise<Array<cisService.applmgmt.system.storage.StorageMapping>>;
               StorageMapping: {
                  (options?: cisService.applmgmt.system.storage.StorageMapping): cisService.applmgmt.system.storage.StorageMapping;
               };
            }
            version: {
               get(): Promise<cisService.applmgmt.system.version.VersionStruct>;
               VersionStruct: {
                  (options?: cisService.applmgmt.system.version.VersionStruct): cisService.applmgmt.system.version.VersionStruct;
               };
            }
            uptime: {
               get(): Promise<number>;
            }
            time: {
               get(): Promise<cisService.applmgmt.system.time.SystemTimeStruct>;
               SystemTimeStruct: {
                  (options?: cisService.applmgmt.system.time.SystemTimeStruct): cisService.applmgmt.system.time.SystemTimeStruct;
               };
            }
         }
         recovery: {
            restore: {
               validate(piece: cisService.applmgmt.recovery.restore.RestoreRequest): Promise<cisService.applmgmt.recovery.restore.Metadata>;
               job: {
                  cancel(): Promise<cisService.applmgmt.recovery.restore.job.ReturnResult>;
                  get(): Promise<cisService.applmgmt.recovery.restore.job.RestoreJobStatus>;
                  create(piece: cisService.applmgmt.recovery.restore.job.RestoreRequest): Promise<cisService.applmgmt.recovery.restore.job.RestoreJobStatus>;
                  LocationType: {
                     "FTPS": string;
                     "HTTP": string;
                     "SCP": string;
                     "HTTPS": string;
                     "FTP": string;
                  };
                  ReturnStatus: {
                     "FAIL": string;
                     "WARNING": string;
                     "OK": string;
                  };
                  BackupRestoreProcessState: {
                     "FAILED": string;
                     "INPROGRESS": string;
                     "NONE": string;
                     "SUCCEEDED": string;
                  };
                  RestoreRequest: {
                     (options?: cisService.applmgmt.recovery.restore.job.RestoreRequest): cisService.applmgmt.recovery.restore.job.RestoreRequest;
                  };
                  LocalizableMessage: {
                     (options?: cisService.applmgmt.recovery.restore.job.LocalizableMessage): cisService.applmgmt.recovery.restore.job.LocalizableMessage;
                  };
                  ReturnResult: {
                     (options?: cisService.applmgmt.recovery.restore.job.ReturnResult): cisService.applmgmt.recovery.restore.job.ReturnResult;
                  };
                  RestoreJobStatus: {
                     (options?: cisService.applmgmt.recovery.restore.job.RestoreJobStatus): cisService.applmgmt.recovery.restore.job.RestoreJobStatus;
                  };
               }
               LocationType: {
                  "FTPS": string;
                  "HTTP": string;
                  "SCP": string;
                  "HTTPS": string;
                  "FTP": string;
               };
               RestoreRequest: {
                  (options?: cisService.applmgmt.recovery.restore.RestoreRequest): cisService.applmgmt.recovery.restore.RestoreRequest;
               };
               Metadata: {
                  (options?: cisService.applmgmt.recovery.restore.Metadata): cisService.applmgmt.recovery.restore.Metadata;
               };
               LocalizableMessage: {
                  (options?: cisService.applmgmt.recovery.restore.LocalizableMessage): cisService.applmgmt.recovery.restore.LocalizableMessage;
               };
            }
            backup: {
               validate(piece: cisService.applmgmt.recovery.backup.BackupRequest): Promise<cisService.applmgmt.recovery.backup.ReturnResult>;
               parts: {
                  get(id: string): Promise<number>;
                  list(): Promise<Array<cisService.applmgmt.recovery.backup.parts.Part>>;
                  Part: {
                     (options?: cisService.applmgmt.recovery.backup.parts.Part): cisService.applmgmt.recovery.backup.parts.Part;
                  };
                  LocalizableMessage: {
                     (options?: cisService.applmgmt.recovery.backup.parts.LocalizableMessage): cisService.applmgmt.recovery.backup.parts.LocalizableMessage;
                  };
               }
               job: {
                  cancel(id: string): Promise<cisService.applmgmt.recovery.backup.job.ReturnResult>;
                  get(id: string): Promise<cisService.applmgmt.recovery.backup.job.BackupJobStatus>;
                  create(piece: cisService.applmgmt.recovery.backup.job.BackupRequest): Promise<cisService.applmgmt.recovery.backup.job.BackupJobStatus>;
                  list(): Promise<Array<string>>;
                  ReturnStatus: {
                     "FAIL": string;
                     "WARNING": string;
                     "OK": string;
                  };
                  BackupRestoreProcessState: {
                     "FAILED": string;
                     "INPROGRESS": string;
                     "NONE": string;
                     "SUCCEEDED": string;
                  };
                  LocationType: {
                     "FTPS": string;
                     "HTTP": string;
                     "SCP": string;
                     "HTTPS": string;
                     "FTP": string;
                  };
                  ReturnResult: {
                     (options?: cisService.applmgmt.recovery.backup.job.ReturnResult): cisService.applmgmt.recovery.backup.job.ReturnResult;
                  };
                  LocalizableMessage: {
                     (options?: cisService.applmgmt.recovery.backup.job.LocalizableMessage): cisService.applmgmt.recovery.backup.job.LocalizableMessage;
                  };
                  BackupRequest: {
                     (options?: cisService.applmgmt.recovery.backup.job.BackupRequest): cisService.applmgmt.recovery.backup.job.BackupRequest;
                  };
                  BackupJobStatus: {
                     (options?: cisService.applmgmt.recovery.backup.job.BackupJobStatus): cisService.applmgmt.recovery.backup.job.BackupJobStatus;
                  };
               }
               LocationType: {
                  "FTPS": string;
                  "HTTP": string;
                  "SCP": string;
                  "HTTPS": string;
                  "FTP": string;
               };
               ReturnStatus: {
                  "FAIL": string;
                  "WARNING": string;
                  "OK": string;
               };
               LocalizableMessage: {
                  (options?: cisService.applmgmt.recovery.backup.LocalizableMessage): cisService.applmgmt.recovery.backup.LocalizableMessage;
               };
               ReturnResult: {
                  (options?: cisService.applmgmt.recovery.backup.ReturnResult): cisService.applmgmt.recovery.backup.ReturnResult;
               };
               BackupRequest: {
                  (options?: cisService.applmgmt.recovery.backup.BackupRequest): cisService.applmgmt.recovery.backup.BackupRequest;
               };
            }
         }
      }
      cis: {
         session: {
            get(): Promise<cisService.cis.session.Info>;
            create(): Promise<string>;
            delete(): Promise<void>;
            Info: {
               (options?: cisService.cis.session.Info): cisService.cis.session.Info;
            };
         }
      }
      tagging: {
         sessions: {
            sessionManager: {
               logout(): Promise<void>;
               keepAlive(): Promise<void>;
               login(): Promise<string>;
            }
         }
         tagAssociation: {
            listAttachedTagsOnObjects(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<cisService.tagging.tagAssociation.ObjectToTags>>;
            listAttachableTags(objectId: cisService.vapi.std.DynamicID): Promise<Array<string>>;
            detach(tagId: string, objectId: cisService.vapi.std.DynamicID): Promise<void>;
            listAttachedObjects(tagId: string): Promise<Array<cisService.vapi.std.DynamicID>>;
            attach(tagId: string, objectId: cisService.vapi.std.DynamicID): Promise<void>;
            listAttachedObjectsOnTags(tagIds: Array<string>): Promise<Array<cisService.tagging.tagAssociation.TagToObjects>>;
            attachMultipleTagsToObject(objectId: cisService.vapi.std.DynamicID, tagIds: Array<string>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            attachTagToMultipleObjects(tagId: string, objectIds: Array<cisService.vapi.std.DynamicID>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            detachTagFromMultipleObjects(tagId: string, objectIds: Array<cisService.vapi.std.DynamicID>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            listAttachedTags(objectId: cisService.vapi.std.DynamicID): Promise<Array<string>>;
            detachMultipleTagsFromObject(objectId: cisService.vapi.std.DynamicID, tagIds: Array<string>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            BatchResult: {
               (options?: cisService.tagging.tagAssociation.BatchResult): cisService.tagging.tagAssociation.BatchResult;
            };
            TagToObjects: {
               (options?: cisService.tagging.tagAssociation.TagToObjects): cisService.tagging.tagAssociation.TagToObjects;
            };
            ObjectToTags: {
               (options?: cisService.tagging.tagAssociation.ObjectToTags): cisService.tagging.tagAssociation.ObjectToTags;
            };
         }
         category: {
            addToUsedBy(categoryId: string, usedByEntity: string): Promise<void>;
            listUsedCategories(usedByEntity: string): Promise<Array<string>>;
            get(categoryId: string): Promise<cisService.tagging.CategoryModel>;
            revokePropagatingPermissions(categoryId: string): Promise<void>;
            create(createSpec: cisService.tagging.category.CreateSpec): Promise<string>;
            update(categoryId: string, updateSpec: cisService.tagging.category.UpdateSpec): Promise<void>;
            list(): Promise<Array<string>>;
            delete(categoryId: string): Promise<void>;
            removeFromUsedBy(categoryId: string, usedByEntity: string): Promise<void>;
            UpdateSpec: {
               (options?: cisService.tagging.category.UpdateSpec): cisService.tagging.category.UpdateSpec;
            };
            CreateSpec: {
               (options?: cisService.tagging.category.CreateSpec): cisService.tagging.category.CreateSpec;
            };
         }
         tag: {
            addToUsedBy(tagId: string, usedByEntity: string): Promise<void>;
            get(tagId: string): Promise<cisService.tagging.TagModel>;
            revokePropagatingPermissions(tagId: string): Promise<void>;
            create(createSpec: cisService.tagging.tag.CreateSpec): Promise<string>;
            update(tagId: string, updateSpec: cisService.tagging.tag.UpdateSpec): Promise<void>;
            list(): Promise<Array<string>>;
            listUsedTags(usedByEntity: string): Promise<Array<string>>;
            delete(tagId: string): Promise<void>;
            removeFromUsedBy(tagId: string, usedByEntity: string): Promise<void>;
            listTagsForCategory(categoryId: string): Promise<Array<string>>;
            UpdateSpec: {
               (options?: cisService.tagging.tag.UpdateSpec): cisService.tagging.tag.UpdateSpec;
            };
            CreateSpec: {
               (options?: cisService.tagging.tag.CreateSpec): cisService.tagging.tag.CreateSpec;
            };
         }
         batch: {
            getAllCategories(): Promise<Array<cisService.tagging.CategoryModel>>;
            listTagsForCategories(categoryIds: Array<string>): Promise<Array<string>>;
            getTags(tagIds: Array<string>): Promise<Array<cisService.tagging.TagModel>>;
            listAttachedTagsOnObjects(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<cisService.tagging.batch.ObjectToTags>>;
            getCategories(categoryIds: Array<string>): Promise<Array<cisService.tagging.CategoryModel>>;
            listAttachedObjects(tagIds: Array<string>): Promise<Array<cisService.vapi.std.DynamicID>>;
            findTagsByName(tagName: string): Promise<Array<string>>;
            listAttachedObjectsOnTags(tagIds: Array<string>): Promise<Array<cisService.tagging.batch.TagToObjects>>;
            listAllAttachedObjectsOnTags(): Promise<Array<cisService.tagging.batch.TagToObjects>>;
            listAttachedTags(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<string>>;
            getAllTags(): Promise<Array<cisService.tagging.TagModel>>;
            TagToObjects: {
               (options?: cisService.tagging.batch.TagToObjects): cisService.tagging.batch.TagToObjects;
            };
            ObjectToTags: {
               (options?: cisService.tagging.batch.ObjectToTags): cisService.tagging.batch.ObjectToTags;
            };
         }
         CategoryModel: {
            (options?: cisService.tagging.CategoryModel): cisService.tagging.CategoryModel;
            Cardinality: {
               "SINGLE": string;
               "MULTIPLE": string;
            }
         };
         TagModel: {
            (options?: cisService.tagging.TagModel): cisService.tagging.TagModel;
         };
      }
      content: {
         library: {
            find(spec: cisService.content.library.FindSpec): Promise<Array<string>>;
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            subscribedItem: {
               sync(libraryItemId: string, forceSyncContent: boolean): Promise<void>;
               evict(libraryItemId: string): Promise<void>;
            }
            item: {
               find(spec: cisService.content.library.item.FindSpec): Promise<Array<string>>;
               get(libraryItemId: string): Promise<cisService.content.library.ItemModel>;
               create(clientToken: string, createSpec: cisService.content.library.ItemModel): Promise<string>;
               update(libraryItemId: string, updateSpec: cisService.content.library.ItemModel): Promise<void>;
               copy(clientToken: string, sourceLibraryItemId: string, destinationCreateSpec: cisService.content.library.ItemModel): Promise<string>;
               list(libraryId: string): Promise<Array<string>>;
               delete(libraryItemId: string): Promise<void>;
               tagging: {
                  get(libraryItemId: string, key: string): Promise<string>;
                  create(libraryItemId: string, key: string, value: string): Promise<void>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.tagging.Info>>;
                  delete(libraryItemId: string, key: string): Promise<void>;
                  Info: {
                     (options?: cisService.content.library.item.tagging.Info): cisService.content.library.item.tagging.Info;
                  };
               }
               updateSession: {
                  cancel(updateSessionId: string): Promise<void>;
                  fail(updateSessionId: string, clientErrorMessage: string): Promise<void>;
                  get(updateSessionId: string): Promise<cisService.content.library.item.UpdateSessionModel>;
                  create(clientToken: string, createSpec: cisService.content.library.item.UpdateSessionModel): Promise<string>;
                  keepAlive(updateSessionId: string, clientProgress: number): Promise<void>;
                  list(libraryItemId: string): Promise<Array<string>>;
                  complete(updateSessionId: string): Promise<void>;
                  delete(updateSessionId: string): Promise<void>;
               }
               downloadSession: {
                  cancel(downloadSessionId: string): Promise<void>;
                  fail(downloadSessionId: string, clientErrorMessage: string): Promise<void>;
                  get(downloadSessionId: string): Promise<cisService.content.library.item.DownloadSessionModel>;
                  create(clientToken: string, createSpec: cisService.content.library.item.DownloadSessionModel): Promise<string>;
                  keepAlive(downloadSessionId: string, progress: number): Promise<void>;
                  list(libraryItemId: string): Promise<Array<string>>;
                  delete(downloadSessionId: string): Promise<void>;
               }
               file: {
                  get(libraryItemId: string, name: string): Promise<cisService.content.library.item.file.Info>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.file.Info>>;
                  ChecksumAlgorithm: {
                     "SHA1": string;
                     "MD5": string;
                  };
                  Info: {
                     (options?: cisService.content.library.item.file.Info): cisService.content.library.item.file.Info;
                  };
                  ChecksumInfo: {
                     (options?: cisService.content.library.item.file.ChecksumInfo): cisService.content.library.item.file.ChecksumInfo;
                  };
               }
               storage: {
                  get(libraryItemId: string, fileName: string): Promise<Array<cisService.content.library.item.storage.Info>>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.storage.Info>>;
                  Info: {
                     (options?: cisService.content.library.item.storage.Info): cisService.content.library.item.storage.Info;
                  };
               }
               downloadsession: {
                  file: {
                     prepare(downloadSessionId: string, fileName: string, endpointType: cisService.content.library.item.downloadsession.file.EndpointType): Promise<cisService.content.library.item.downloadsession.file.Info>;
                     get(downloadSessionId: string, fileName: string): Promise<cisService.content.library.item.downloadsession.file.Info>;
                     list(downloadSessionId: string): Promise<Array<cisService.content.library.item.downloadsession.file.Info>>;
                     PrepareStatus: {
                        "UNPREPARED": string;
                        "PREPARE_REQUESTED": string;
                        "PREPARING": string;
                        "PREPARED": string;
                        "ERROR": string;
                     };
                     EndpointType: {
                        "HTTPS": string;
                        "DIRECT": string;
                     };
                     Info: {
                        (options?: cisService.content.library.item.downloadsession.file.Info): cisService.content.library.item.downloadsession.file.Info;
                     };
                  }
               }
               updatesession: {
                  file: {
                     add(updateSessionId: string, fileSpec: cisService.content.library.item.updatesession.file.AddSpec): Promise<cisService.content.library.item.updatesession.file.Info>;
                     get(updateSessionId: string, fileName: string): Promise<cisService.content.library.item.updatesession.file.Info>;
                     list(updateSessionId: string): Promise<Array<cisService.content.library.item.updatesession.file.Info>>;
                     remove(updateSessionId: string, fileName: string): Promise<void>;
                     validate(updateSessionId: string): Promise<cisService.content.library.item.updatesession.file.ValidationResult>;
                     SourceType: {
                        "NONE": string;
                        "PUSH": string;
                        "PULL": string;
                     };
                     Info: {
                        (options?: cisService.content.library.item.updatesession.file.Info): cisService.content.library.item.updatesession.file.Info;
                     };
                     ValidationResult: {
                        (options?: cisService.content.library.item.updatesession.file.ValidationResult): cisService.content.library.item.updatesession.file.ValidationResult;
                     };
                     AddSpec: {
                        (options?: cisService.content.library.item.updatesession.file.AddSpec): cisService.content.library.item.updatesession.file.AddSpec;
                     };
                     ValidationError: {
                        (options?: cisService.content.library.item.updatesession.file.ValidationError): cisService.content.library.item.updatesession.file.ValidationError;
                     };
                  }
               }
               FindSpec: {
                  (options?: cisService.content.library.item.FindSpec): cisService.content.library.item.FindSpec;
               };
               TransferStatus: {
                  "WAITING_FOR_TRANSFER": string;
                  "TRANSFERRING": string;
                  "READY": string;
                  "VALIDATING": string;
                  "ERROR": string;
               };
               UpdateSessionModel: {
                  (options?: cisService.content.library.item.UpdateSessionModel): cisService.content.library.item.UpdateSessionModel;
                  State: {
                     "ACTIVE": string;
                     "DONE": string;
                     "ERROR": string;
                     "CANCELED": string;
                  }
               };
               DownloadSessionModel: {
                  (options?: cisService.content.library.item.DownloadSessionModel): cisService.content.library.item.DownloadSessionModel;
                  State: {
                     "ACTIVE": string;
                     "CANCELED": string;
                     "ERROR": string;
                  }
               };
               TransferEndpoint: {
                  (options?: cisService.content.library.item.TransferEndpoint): cisService.content.library.item.TransferEndpoint;
               };
            }
            itemPath: {
               getByDatastorePath(datastorePath: string): Promise<cisService.content.library.ItemModel>;
            }
            FindSpec: {
               (options?: cisService.content.library.FindSpec): cisService.content.library.FindSpec;
            };
            SubscriptionInfo: {
               (options?: cisService.content.library.SubscriptionInfo): cisService.content.library.SubscriptionInfo;
               AuthenticationMethod: string; //NOTE: BASIC or NONE
               
            };
            ItemModel: {
               (options?: cisService.content.library.ItemModel): cisService.content.library.ItemModel;
            };
            PublishInfo: {
               (options?: cisService.content.library.PublishInfo): cisService.content.library.PublishInfo;
               AuthenticationMethod: string; //NOTE: BASIC or NONE
               
            };
            OptimizationInfo: {
               (options?: cisService.content.library.OptimizationInfo): cisService.content.library.OptimizationInfo;
            };
            StorageBacking: {
               (options?: cisService.content.library.StorageBacking): cisService.content.library.StorageBacking;
               Type: {
                  "DATASTORE": string;
                  "OTHER": string;
               }
            };
         }
         localLibrary: {
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            create(clientToken: string, createSpec: cisService.content.LibraryModel): Promise<string>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            delete(libraryId: string): Promise<void>;
         }
         configuration: {
            get(): Promise<cisService.content.ConfigurationModel>;
            update(model: cisService.content.ConfigurationModel): Promise<void>;
         }
         subscribedLibrary: {
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            create(clientToken: string, createSpec: cisService.content.LibraryModel): Promise<string>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            delete(libraryId: string): Promise<void>;
            sync(libraryId: string): Promise<void>;
            evict(libraryId: string): Promise<void>;
            probe(subscriptionInfo: cisService.content.library.SubscriptionInfo): Promise<cisService.content.subscribedLibrary.ProbeResult>;
            ProbeResult: {
               (options?: cisService.content.subscribedLibrary.ProbeResult): cisService.content.subscribedLibrary.ProbeResult;
               Status: {
                  "SUCCESS": string;
                  "INVALID_URL": string;
                  "TIMED_OUT": string;
                  "HOST_NOT_FOUND": string;
                  "RESOURCE_NOT_FOUND": string;
                  "INVALID_CREDENTIALS": string;
                  "CERTIFICATE_ERROR": string;
                  "UNKNOWN_ERROR": string;
               }
            };
         }
         type: {
            list(): Promise<Array<cisService.content.type.Info>>;
            Info: {
               (options?: cisService.content.type.Info): cisService.content.type.Info;
            };
            ovf: {
               OvfTemplate: {
                  (options?: cisService.content.type.ovf.OvfTemplate): cisService.content.type.ovf.OvfTemplate;
               };
               VmTemplate: {
                  (options?: cisService.content.type.ovf.VmTemplate): cisService.content.type.ovf.VmTemplate;
               };
               Disk: {
                  (options?: cisService.content.type.ovf.Disk): cisService.content.type.ovf.Disk;
               };
               Network: {
                  (options?: cisService.content.type.ovf.Network): cisService.content.type.ovf.Network;
               };
               VideoCard: {
                  (options?: cisService.content.type.ovf.VideoCard): cisService.content.type.ovf.VideoCard;
               };
               DiskController: {
                  (options?: cisService.content.type.ovf.DiskController): cisService.content.type.ovf.DiskController;
               };
               Cpu: {
                  (options?: cisService.content.type.ovf.Cpu): cisService.content.type.ovf.Cpu;
               };
               Nic: {
                  (options?: cisService.content.type.ovf.Nic): cisService.content.type.ovf.Nic;
               };
               Floppy: {
                  (options?: cisService.content.type.ovf.Floppy): cisService.content.type.ovf.Floppy;
               };
               Memory: {
                  (options?: cisService.content.type.ovf.Memory): cisService.content.type.ovf.Memory;
               };
               Drive: {
                  (options?: cisService.content.type.ovf.Drive): cisService.content.type.ovf.Drive;
               };
               VAppTemplate: {
                  (options?: cisService.content.type.ovf.VAppTemplate): cisService.content.type.ovf.VAppTemplate;
               };
               USBController: {
                  (options?: cisService.content.type.ovf.USBController): cisService.content.type.ovf.USBController;
               };
               policy: {
                  StoragePolicy: {
                     (options?: cisService.content.type.ovf.policy.StoragePolicy): cisService.content.type.ovf.policy.StoragePolicy;
                  };
                  StoragePolicyGroup: {
                     (options?: cisService.content.type.ovf.policy.StoragePolicyGroup): cisService.content.type.ovf.policy.StoragePolicyGroup;
                  };
               }
            }
         }
         ConfigurationModel: {
            (options?: cisService.content.ConfigurationModel): cisService.content.ConfigurationModel;
         };
         LibraryModel: {
            (options?: cisService.content.LibraryModel): cisService.content.LibraryModel;
            LibraryType: {
               "LOCAL": string;
               "SUBSCRIBED": string;
            }
         };
      }
      vapi: {
         metadata: {
            metamodel: {
               service: {
                  operation: {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.metamodel.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
                  hidden: {
                     list(): Promise<Array<string>>;
                  }
                  get(serviceId: string): Promise<cisService.vapi.metadata.metamodel.ServiceInfo>;
                  list(): Promise<Array<string>>;
               }
               package: {
                  get(packageId: string): Promise<cisService.vapi.metadata.metamodel.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               structure: {
                  get(structureId: string): Promise<cisService.vapi.metadata.metamodel.StructureInfo>;
                  list(): Promise<Array<string>>;
               }
               enumeration: {
                  get(enumerationId: string): Promise<cisService.vapi.metadata.metamodel.EnumerationInfo>;
                  list(): Promise<Array<string>>;
               }
               component: {
                  get(componentId: string): Promise<cisService.vapi.metadata.metamodel.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               resource: {
                  list(): Promise<Array<string>>;
                  model: {
                     list(resourceId: string): Promise<Array<string>>;
                  }
               }
               source: {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.metamodel.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.metamodel.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
                  CreateSpec: {
                     (options?: cisService.vapi.metadata.metamodel.source.CreateSpec): cisService.vapi.metadata.metamodel.source.CreateSpec;
                  };
                  Info: {
                     (options?: cisService.vapi.metadata.metamodel.source.Info): cisService.vapi.metadata.metamodel.source.Info;
                  };
               }
               EnumerationInfo: {
                  (options?: cisService.vapi.metadata.metamodel.EnumerationInfo): cisService.vapi.metadata.metamodel.EnumerationInfo;
               };
               EnumerationValueInfo: {
                  (options?: cisService.vapi.metadata.metamodel.EnumerationValueInfo): cisService.vapi.metadata.metamodel.EnumerationValueInfo;
               };
               ComponentInfo: {
                  (options?: cisService.vapi.metadata.metamodel.ComponentInfo): cisService.vapi.metadata.metamodel.ComponentInfo;
               };
               ComponentData: {
                  (options?: cisService.vapi.metadata.metamodel.ComponentData): cisService.vapi.metadata.metamodel.ComponentData;
               };
               GenericInstantiation: {
                  (options?: cisService.vapi.metadata.metamodel.GenericInstantiation): cisService.vapi.metadata.metamodel.GenericInstantiation;
                  GenericType: {
                     "LIST": string;
                     "MAP": string;
                     "OPTIONAL": string;
                     "SET": string;
                  }
               };
               ServiceInfo: {
                  (options?: cisService.vapi.metadata.metamodel.ServiceInfo): cisService.vapi.metadata.metamodel.ServiceInfo;
               };
               UserDefinedType: {
                  (options?: cisService.vapi.metadata.metamodel.UserDefinedType): cisService.vapi.metadata.metamodel.UserDefinedType;
               };
               ConstantInfo: {
                  (options?: cisService.vapi.metadata.metamodel.ConstantInfo): cisService.vapi.metadata.metamodel.ConstantInfo;
               };
               PrimitiveValue: {
                  (options?: cisService.vapi.metadata.metamodel.PrimitiveValue): cisService.vapi.metadata.metamodel.PrimitiveValue;
                  Type: {
                     "BOOLEAN": string;
                     "DOUBLE": string;
                     "LONG": string;
                     "STRING": string;
                  }
               };
               ConstantValue: {
                  (options?: cisService.vapi.metadata.metamodel.ConstantValue): cisService.vapi.metadata.metamodel.ConstantValue;
                  Category: {
                     "PRIMITIVE": string;
                     "LIST": string;
                  }
               };
               OperationResultInfo: {
                  (options?: cisService.vapi.metadata.metamodel.OperationResultInfo): cisService.vapi.metadata.metamodel.OperationResultInfo;
               };
               ElementMap: {
                  (options?: cisService.vapi.metadata.metamodel.ElementMap): cisService.vapi.metadata.metamodel.ElementMap;
               };
               StructureInfo: {
                  (options?: cisService.vapi.metadata.metamodel.StructureInfo): cisService.vapi.metadata.metamodel.StructureInfo;
                  Type: {
                     "STRUCTURE": string;
                     "ERROR": string;
                  }
               };
               OperationInfo: {
                  (options?: cisService.vapi.metadata.metamodel.OperationInfo): cisService.vapi.metadata.metamodel.OperationInfo;
               };
               Type: {
                  (options?: cisService.vapi.metadata.metamodel.Type): cisService.vapi.metadata.metamodel.Type;
                  BuiltinType: {
                     "VOID": string;
                     "BOOLEAN": string;
                     "LONG": string;
                     "DOUBLE": string;
                     "STRING": string;
                     "BINARY": string;
                     "SECRET": string;
                     "DATE_TIME": string;
                     "ID": string;
                     "URI": string;
                     "ANY_ERROR": string;
                     "DYNAMIC_STRUCTURE": string;
                     "OPAQUE": string;
                  }
                  Category: {
                     "BUILTIN": string;
                     "USER_DEFINED": string;
                     "GENERIC": string;
                  }
               };
               ErrorInfo: {
                  (options?: cisService.vapi.metadata.metamodel.ErrorInfo): cisService.vapi.metadata.metamodel.ErrorInfo;
               };
               FieldInfo: {
                  (options?: cisService.vapi.metadata.metamodel.FieldInfo): cisService.vapi.metadata.metamodel.FieldInfo;
               };
               ElementValue: {
                  (options?: cisService.vapi.metadata.metamodel.ElementValue): cisService.vapi.metadata.metamodel.ElementValue;
                  Type: {
                     "LONG": string;
                     "STRING": string;
                     "STRING_LIST": string;
                     "STRUCTURE_REFERENCE": string;
                     "STRUCTURE_REFERENCE_LIST": string;
                  }
               };
               PackageInfo: {
                  (options?: cisService.vapi.metadata.metamodel.PackageInfo): cisService.vapi.metadata.metamodel.PackageInfo;
               };
            }
            cli: {
               source: {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.cli.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.cli.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
                  CreateSpec: {
                     (options?: cisService.vapi.metadata.cli.source.CreateSpec): cisService.vapi.metadata.cli.source.CreateSpec;
                  };
                  Info: {
                     (options?: cisService.vapi.metadata.cli.source.Info): cisService.vapi.metadata.cli.source.Info;
                  };
               }
               command: {
                  get(identity: cisService.vapi.metadata.cli.command.Identity): Promise<cisService.vapi.metadata.cli.command.Info>;
                  fingerprint(): Promise<string>;
                  list(path: string): Promise<Array<cisService.vapi.metadata.cli.command.Identity>>;
                  FormatterType: {
                     "SIMPLE": string;
                     "TABLE": string;
                     "JSON": string;
                     "XML": string;
                     "CSV": string;
                     "HTML": string;
                  };
                  GenericType: {
                     "NONE": string;
                     "OPTIONAL": string;
                     "LIST": string;
                     "OPTIONAL_LIST": string;
                     "LIST_OPTIONAL": string;
                  };
                  OptionInfo: {
                     (options?: cisService.vapi.metadata.cli.command.OptionInfo): cisService.vapi.metadata.cli.command.OptionInfo;
                  };
                  Identity: {
                     (options?: cisService.vapi.metadata.cli.command.Identity): cisService.vapi.metadata.cli.command.Identity;
                  };
                  OutputInfo: {
                     (options?: cisService.vapi.metadata.cli.command.OutputInfo): cisService.vapi.metadata.cli.command.OutputInfo;
                  };
                  OutputFieldInfo: {
                     (options?: cisService.vapi.metadata.cli.command.OutputFieldInfo): cisService.vapi.metadata.cli.command.OutputFieldInfo;
                  };
                  Info: {
                     (options?: cisService.vapi.metadata.cli.command.Info): cisService.vapi.metadata.cli.command.Info;
                  };
               }
               namespace: {
                  get(identity: cisService.vapi.metadata.cli.namespace.Identity): Promise<cisService.vapi.metadata.cli.namespace.Info>;
                  fingerprint(): Promise<string>;
                  list(): Promise<Array<cisService.vapi.metadata.cli.namespace.Identity>>;
                  Identity: {
                     (options?: cisService.vapi.metadata.cli.namespace.Identity): cisService.vapi.metadata.cli.namespace.Identity;
                  };
                  Info: {
                     (options?: cisService.vapi.metadata.cli.namespace.Info): cisService.vapi.metadata.cli.namespace.Info;
                  };
               }
            }
            authentication: {
               source: {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.authentication.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.authentication.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
                  CreateSpec: {
                     (options?: cisService.vapi.metadata.authentication.source.CreateSpec): cisService.vapi.metadata.authentication.source.CreateSpec;
                  };
                  Info: {
                     (options?: cisService.vapi.metadata.authentication.source.Info): cisService.vapi.metadata.authentication.source.Info;
                  };
               }
               service: {
                  get(serviceId: string): Promise<cisService.vapi.metadata.authentication.ServiceInfo>;
                  list(): Promise<Array<string>>;
                  operation: {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.authentication.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
               }
               component: {
                  get(componentId: string): Promise<cisService.vapi.metadata.authentication.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               package: {
                  get(packageId: string): Promise<cisService.vapi.metadata.authentication.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               ComponentInfo: {
                  (options?: cisService.vapi.metadata.authentication.ComponentInfo): cisService.vapi.metadata.authentication.ComponentInfo;
               };
               AuthenticationInfo: {
                  (options?: cisService.vapi.metadata.authentication.AuthenticationInfo): cisService.vapi.metadata.authentication.AuthenticationInfo;
                  SchemeType: {
                     "SESSIONLESS": string;
                     "SESSION_AWARE": string;
                  }
               };
               ComponentData: {
                  (options?: cisService.vapi.metadata.authentication.ComponentData): cisService.vapi.metadata.authentication.ComponentData;
               };
               PackageInfo: {
                  (options?: cisService.vapi.metadata.authentication.PackageInfo): cisService.vapi.metadata.authentication.PackageInfo;
               };
               OperationInfo: {
                  (options?: cisService.vapi.metadata.authentication.OperationInfo): cisService.vapi.metadata.authentication.OperationInfo;
               };
               ServiceInfo: {
                  (options?: cisService.vapi.metadata.authentication.ServiceInfo): cisService.vapi.metadata.authentication.ServiceInfo;
               };
            }
            privilege: {
               component: {
                  get(componentId: string): Promise<cisService.vapi.metadata.privilege.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               source: {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.privilege.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.privilege.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
                  Info: {
                     (options?: cisService.vapi.metadata.privilege.source.Info): cisService.vapi.metadata.privilege.source.Info;
                  };
                  CreateSpec: {
                     (options?: cisService.vapi.metadata.privilege.source.CreateSpec): cisService.vapi.metadata.privilege.source.CreateSpec;
                  };
               }
               package: {
                  get(packageId: string): Promise<cisService.vapi.metadata.privilege.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               service: {
                  get(serviceId: string): Promise<cisService.vapi.metadata.privilege.ServiceInfo>;
                  list(): Promise<Array<string>>;
                  operation: {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.privilege.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
               }
               OperationInfo: {
                  (options?: cisService.vapi.metadata.privilege.OperationInfo): cisService.vapi.metadata.privilege.OperationInfo;
               };
               ServiceInfo: {
                  (options?: cisService.vapi.metadata.privilege.ServiceInfo): cisService.vapi.metadata.privilege.ServiceInfo;
               };
               ComponentInfo: {
                  (options?: cisService.vapi.metadata.privilege.ComponentInfo): cisService.vapi.metadata.privilege.ComponentInfo;
               };
               PrivilegeInfo: {
                  (options?: cisService.vapi.metadata.privilege.PrivilegeInfo): cisService.vapi.metadata.privilege.PrivilegeInfo;
               };
               PackageInfo: {
                  (options?: cisService.vapi.metadata.privilege.PackageInfo): cisService.vapi.metadata.privilege.PackageInfo;
               };
               ComponentData: {
                  (options?: cisService.vapi.metadata.privilege.ComponentData): cisService.vapi.metadata.privilege.ComponentData;
               };
            }
            SourceType: {
               "FILE": string;
               "REMOTE": string;
            };
            SourceInfo: {
               (options?: cisService.vapi.metadata.SourceInfo): cisService.vapi.metadata.SourceInfo;
            };
            SourceCreateSpec: {
               (options?: cisService.vapi.metadata.SourceCreateSpec): cisService.vapi.metadata.SourceCreateSpec;
            };
         }
         std: {
            errors: {
               Unauthorized: {
                  (options?: cisService.vapi.std.errors.Unauthorized): cisService.vapi.std.errors.Unauthorized;
               };
               FeatureInUse: {
                  (options?: cisService.vapi.std.errors.FeatureInUse): cisService.vapi.std.errors.FeatureInUse;
               };
               TransientIndication: {
                  (options?: cisService.vapi.std.errors.TransientIndication): cisService.vapi.std.errors.TransientIndication;
               };
               UnexpectedInput: {
                  (options?: cisService.vapi.std.errors.UnexpectedInput): cisService.vapi.std.errors.UnexpectedInput;
               };
               ResourceInUse: {
                  (options?: cisService.vapi.std.errors.ResourceInUse): cisService.vapi.std.errors.ResourceInUse;
               };
               AlreadyInDesiredState: {
                  (options?: cisService.vapi.std.errors.AlreadyInDesiredState): cisService.vapi.std.errors.AlreadyInDesiredState;
               };
               ServiceUnavailable: {
                  (options?: cisService.vapi.std.errors.ServiceUnavailable): cisService.vapi.std.errors.ServiceUnavailable;
               };
               AlreadyExists: {
                  (options?: cisService.vapi.std.errors.AlreadyExists): cisService.vapi.std.errors.AlreadyExists;
               };
               InvalidArgument: {
                  (options?: cisService.vapi.std.errors.InvalidArgument): cisService.vapi.std.errors.InvalidArgument;
               };
               InvalidElementType: {
                  (options?: cisService.vapi.std.errors.InvalidElementType): cisService.vapi.std.errors.InvalidElementType;
               };
               InvalidRequest: {
                  (options?: cisService.vapi.std.errors.InvalidRequest): cisService.vapi.std.errors.InvalidRequest;
               };
               UnableToAllocateResource: {
                  (options?: cisService.vapi.std.errors.UnableToAllocateResource): cisService.vapi.std.errors.UnableToAllocateResource;
               };
               TimedOut: {
                  (options?: cisService.vapi.std.errors.TimedOut): cisService.vapi.std.errors.TimedOut;
               };
               Error: {
                  (options?: cisService.vapi.std.errors.Error): cisService.vapi.std.errors.Error;
               };
               FileLocations: {
                  (options?: cisService.vapi.std.errors.FileLocations): cisService.vapi.std.errors.FileLocations;
               };
               Canceled: {
                  (options?: cisService.vapi.std.errors.Canceled): cisService.vapi.std.errors.Canceled;
               };
               ConcurrentChange: {
                  (options?: cisService.vapi.std.errors.ConcurrentChange): cisService.vapi.std.errors.ConcurrentChange;
               };
               InvalidElementConfiguration: {
                  (options?: cisService.vapi.std.errors.InvalidElementConfiguration): cisService.vapi.std.errors.InvalidElementConfiguration;
               };
               ResourceInaccessible: {
                  (options?: cisService.vapi.std.errors.ResourceInaccessible): cisService.vapi.std.errors.ResourceInaccessible;
               };
               ArgumentLocations: {
                  (options?: cisService.vapi.std.errors.ArgumentLocations): cisService.vapi.std.errors.ArgumentLocations;
               };
               NotFound: {
                  (options?: cisService.vapi.std.errors.NotFound): cisService.vapi.std.errors.NotFound;
               };
               ResourceBusy: {
                  (options?: cisService.vapi.std.errors.ResourceBusy): cisService.vapi.std.errors.ResourceBusy;
               };
               NotAllowedInCurrentState: {
                  (options?: cisService.vapi.std.errors.NotAllowedInCurrentState): cisService.vapi.std.errors.NotAllowedInCurrentState;
               };
               Unauthenticated: {
                  (options?: cisService.vapi.std.errors.Unauthenticated): cisService.vapi.std.errors.Unauthenticated;
               };
               InternalServerError: {
                  (options?: cisService.vapi.std.errors.InternalServerError): cisService.vapi.std.errors.InternalServerError;
               };
               OperationNotFound: {
                  (options?: cisService.vapi.std.errors.OperationNotFound): cisService.vapi.std.errors.OperationNotFound;
               };
               Unsupported: {
                  (options?: cisService.vapi.std.errors.Unsupported): cisService.vapi.std.errors.Unsupported;
               };
            }
            DynamicID: {
               (options?: cisService.vapi.std.DynamicID): cisService.vapi.std.DynamicID;
            };
            AuthenticationScheme: {
               (options?: cisService.vapi.std.AuthenticationScheme): cisService.vapi.std.AuthenticationScheme;
               USER_PASSWORD: string;
               NO_AUTHENTICATION: string;
               SAML_BEARER_TOKEN: string;
               OAUTH_ACCESS_TOKEN: string;
               SESSION_ID: string;
               SAML_HOK_TOKEN: string;
            };
            LocalizableMessage: {
               (options?: cisService.vapi.std.LocalizableMessage): cisService.vapi.std.LocalizableMessage;
            };
         }
      }
      vcenter: {
         vm: {
            power: {
               suspend(vm: string): Promise<void>;
               stop(vm: string): Promise<void>;
               get(vm: string): Promise<cisService.vcenter.vm.power.Info>;
               start(vm: string): Promise<void>;
               reset(vm: string): Promise<void>;
               State: {
                  "POWERED_OFF": string;
                  "POWERED_ON": string;
                  "SUSPENDED": string;
               };
               Info: {
                  (options?: cisService.vcenter.vm.power.Info): cisService.vcenter.vm.power.Info;
               };
            }
            hardware: {
               upgrade(vm: string, version: cisService.vcenter.vm.hardware.Version): Promise<void>;
               get(vm: string): Promise<cisService.vcenter.vm.hardware.Info>;
               update(vm: string, spec: cisService.vcenter.vm.hardware.UpdateSpec): Promise<void>;
               boot: {
                  device: {
                     set(vm: string, devices: Array<cisService.vcenter.vm.hardware.boot.device.Entry>): Promise<void>;
                     get(vm: string): Promise<Array<cisService.vcenter.vm.hardware.boot.device.Entry>>;
                     Type: {
                        "CDROM": string;
                        "DISK": string;
                        "ETHERNET": string;
                        "FLOPPY": string;
                     };
                     Entry: {
                        (options?: cisService.vcenter.vm.hardware.boot.device.Entry): cisService.vcenter.vm.hardware.boot.device.Entry;
                     };
                     EntryCreateSpec: {
                        (options?: cisService.vcenter.vm.hardware.boot.device.EntryCreateSpec): cisService.vcenter.vm.hardware.boot.device.EntryCreateSpec;
                     };
                  }
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.boot.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.boot.UpdateSpec): Promise<void>;
                  Type: {
                     "BIOS": string;
                     "EFI": string;
                  };
                  NetworkProtocol: {
                     "IPV4": string;
                     "IPV6": string;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.boot.UpdateSpec): cisService.vcenter.vm.hardware.boot.UpdateSpec;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.boot.CreateSpec): cisService.vcenter.vm.hardware.boot.CreateSpec;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.boot.Info): cisService.vcenter.vm.hardware.boot.Info;
                  };
               }
               adapter: {
                  scsi: {
                     get(vm: string, adapter: string): Promise<cisService.vcenter.vm.hardware.adapter.scsi.Info>;
                     create(vm: string, spec: cisService.vcenter.vm.hardware.adapter.scsi.CreateSpec): Promise<string>;
                     update(vm: string, adapter: string, spec: cisService.vcenter.vm.hardware.adapter.scsi.UpdateSpec): Promise<void>;
                     list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.adapter.scsi.Summary>>;
                     delete(vm: string, adapter: string): Promise<void>;
                     Sharing: {
                        "NONE": string;
                        "VIRTUAL": string;
                        "PHYSICAL": string;
                     };
                     Type: {
                        "BUSLOGIC": string;
                        "LSILOGIC": string;
                        "LSILOGICSAS": string;
                        "PVSCSI": string;
                     };
                     UpdateSpec: {
                        (options?: cisService.vcenter.vm.hardware.adapter.scsi.UpdateSpec): cisService.vcenter.vm.hardware.adapter.scsi.UpdateSpec;
                     };
                     Summary: {
                        (options?: cisService.vcenter.vm.hardware.adapter.scsi.Summary): cisService.vcenter.vm.hardware.adapter.scsi.Summary;
                     };
                     Info: {
                        (options?: cisService.vcenter.vm.hardware.adapter.scsi.Info): cisService.vcenter.vm.hardware.adapter.scsi.Info;
                     };
                     CreateSpec: {
                        (options?: cisService.vcenter.vm.hardware.adapter.scsi.CreateSpec): cisService.vcenter.vm.hardware.adapter.scsi.CreateSpec;
                     };
                  }
                  sata: {
                     get(vm: string, adapter: string): Promise<cisService.vcenter.vm.hardware.adapter.sata.Info>;
                     create(vm: string, spec: cisService.vcenter.vm.hardware.adapter.sata.CreateSpec): Promise<string>;
                     list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.adapter.sata.Summary>>;
                     delete(vm: string, adapter: string): Promise<void>;
                     Type: {
                        "AHCI": string;
                     };
                     CreateSpec: {
                        (options?: cisService.vcenter.vm.hardware.adapter.sata.CreateSpec): cisService.vcenter.vm.hardware.adapter.sata.CreateSpec;
                     };
                     Info: {
                        (options?: cisService.vcenter.vm.hardware.adapter.sata.Info): cisService.vcenter.vm.hardware.adapter.sata.Info;
                     };
                     Summary: {
                        (options?: cisService.vcenter.vm.hardware.adapter.sata.Summary): cisService.vcenter.vm.hardware.adapter.sata.Summary;
                     };
                  }
               }
               cdrom: {
                  disconnect(vm: string, cdrom: string): Promise<void>;
                  get(vm: string, cdrom: string): Promise<cisService.vcenter.vm.hardware.cdrom.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.cdrom.CreateSpec): Promise<string>;
                  update(vm: string, cdrom: string, spec: cisService.vcenter.vm.hardware.cdrom.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.cdrom.Summary>>;
                  delete(vm: string, cdrom: string): Promise<void>;
                  connect(vm: string, cdrom: string): Promise<void>;
                  HostBusAdapterType: {
                     "IDE": string;
                     "SATA": string;
                  };
                  BackingType: {
                     "ISO_FILE": string;
                     "HOST_DEVICE": string;
                     "CLIENT_DEVICE": string;
                  };
                  DeviceAccessType: {
                     "EMULATION": string;
                     "PASSTHRU": string;
                     "PASSTHRU_EXCLUSIVE": string;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.CreateSpec): cisService.vcenter.vm.hardware.cdrom.CreateSpec;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.Summary): cisService.vcenter.vm.hardware.cdrom.Summary;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.Info): cisService.vcenter.vm.hardware.cdrom.Info;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.UpdateSpec): cisService.vcenter.vm.hardware.cdrom.UpdateSpec;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.BackingSpec): cisService.vcenter.vm.hardware.cdrom.BackingSpec;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.cdrom.BackingInfo): cisService.vcenter.vm.hardware.cdrom.BackingInfo;
                  };
               }
               serial: {
                  disconnect(vm: string, port: string): Promise<void>;
                  get(vm: string, port: string): Promise<cisService.vcenter.vm.hardware.serial.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.serial.CreateSpec): Promise<string>;
                  update(vm: string, port: string, spec: cisService.vcenter.vm.hardware.serial.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.serial.Summary>>;
                  delete(vm: string, port: string): Promise<void>;
                  connect(vm: string, port: string): Promise<void>;
                  BackingType: {
                     "FILE": string;
                     "HOST_DEVICE": string;
                     "PIPE_SERVER": string;
                     "PIPE_CLIENT": string;
                     "NETWORK_SERVER": string;
                     "NETWORK_CLIENT": string;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.serial.BackingInfo): cisService.vcenter.vm.hardware.serial.BackingInfo;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.serial.CreateSpec): cisService.vcenter.vm.hardware.serial.CreateSpec;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.serial.UpdateSpec): cisService.vcenter.vm.hardware.serial.UpdateSpec;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.serial.BackingSpec): cisService.vcenter.vm.hardware.serial.BackingSpec;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.serial.Info): cisService.vcenter.vm.hardware.serial.Info;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.serial.Summary): cisService.vcenter.vm.hardware.serial.Summary;
                  };
               }
               floppy: {
                  disconnect(vm: string, floppy: string): Promise<void>;
                  get(vm: string, floppy: string): Promise<cisService.vcenter.vm.hardware.floppy.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.floppy.CreateSpec): Promise<string>;
                  update(vm: string, floppy: string, spec: cisService.vcenter.vm.hardware.floppy.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.floppy.Summary>>;
                  delete(vm: string, floppy: string): Promise<void>;
                  connect(vm: string, floppy: string): Promise<void>;
                  BackingType: {
                     "IMAGE_FILE": string;
                     "HOST_DEVICE": string;
                     "CLIENT_DEVICE": string;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.floppy.Info): cisService.vcenter.vm.hardware.floppy.Info;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.floppy.UpdateSpec): cisService.vcenter.vm.hardware.floppy.UpdateSpec;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.floppy.CreateSpec): cisService.vcenter.vm.hardware.floppy.CreateSpec;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.floppy.Summary): cisService.vcenter.vm.hardware.floppy.Summary;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.floppy.BackingInfo): cisService.vcenter.vm.hardware.floppy.BackingInfo;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.floppy.BackingSpec): cisService.vcenter.vm.hardware.floppy.BackingSpec;
                  };
               }
               memory: {
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.memory.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.memory.UpdateSpec): Promise<void>;
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.memory.Info): cisService.vcenter.vm.hardware.memory.Info;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.memory.UpdateSpec): cisService.vcenter.vm.hardware.memory.UpdateSpec;
                  };
               }
               disk: {
                  get(vm: string, disk: string): Promise<cisService.vcenter.vm.hardware.disk.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.disk.CreateSpec): Promise<string>;
                  update(vm: string, disk: string, spec: cisService.vcenter.vm.hardware.disk.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.disk.Summary>>;
                  delete(vm: string, disk: string): Promise<void>;
                  BackingType: {
                     "VMDK_FILE": string;
                  };
                  HostBusAdapterType: {
                     "IDE": string;
                     "SCSI": string;
                     "SATA": string;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.disk.BackingSpec): cisService.vcenter.vm.hardware.disk.BackingSpec;
                  };
                  VmdkCreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.disk.VmdkCreateSpec): cisService.vcenter.vm.hardware.disk.VmdkCreateSpec;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.disk.BackingInfo): cisService.vcenter.vm.hardware.disk.BackingInfo;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.disk.Summary): cisService.vcenter.vm.hardware.disk.Summary;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.disk.Info): cisService.vcenter.vm.hardware.disk.Info;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.disk.CreateSpec): cisService.vcenter.vm.hardware.disk.CreateSpec;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.disk.UpdateSpec): cisService.vcenter.vm.hardware.disk.UpdateSpec;
                  };
               }
               ethernet: {
                  disconnect(vm: string, nic: string): Promise<void>;
                  get(vm: string, nic: string): Promise<cisService.vcenter.vm.hardware.ethernet.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.ethernet.CreateSpec): Promise<string>;
                  update(vm: string, nic: string, spec: cisService.vcenter.vm.hardware.ethernet.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.ethernet.Summary>>;
                  delete(vm: string, nic: string): Promise<void>;
                  connect(vm: string, nic: string): Promise<void>;
                  MacAddressType: {
                     "MANUAL": string;
                     "GENERATED": string;
                     "ASSIGNED": string;
                  };
                  EmulationType: {
                     "E1000": string;
                     "E1000E": string;
                     "PCNET32": string;
                     "VMXNET": string;
                     "VMXNET2": string;
                     "VMXNET3": string;
                  };
                  BackingType: {
                     "STANDARD_PORTGROUP": string;
                     "HOST_DEVICE": string;
                     "DISTRIBUTED_PORTGROUP": string;
                     "OPAQUE_NETWORK": string;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.CreateSpec): cisService.vcenter.vm.hardware.ethernet.CreateSpec;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.Info): cisService.vcenter.vm.hardware.ethernet.Info;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.UpdateSpec): cisService.vcenter.vm.hardware.ethernet.UpdateSpec;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.BackingInfo): cisService.vcenter.vm.hardware.ethernet.BackingInfo;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.BackingSpec): cisService.vcenter.vm.hardware.ethernet.BackingSpec;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.ethernet.Summary): cisService.vcenter.vm.hardware.ethernet.Summary;
                  };
               }
               parallel: {
                  disconnect(vm: string, port: string): Promise<void>;
                  get(vm: string, port: string): Promise<cisService.vcenter.vm.hardware.parallel.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.parallel.CreateSpec): Promise<string>;
                  update(vm: string, port: string, spec: cisService.vcenter.vm.hardware.parallel.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.parallel.Summary>>;
                  delete(vm: string, port: string): Promise<void>;
                  connect(vm: string, port: string): Promise<void>;
                  BackingType: {
                     "FILE": string;
                     "HOST_DEVICE": string;
                  };
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.parallel.Info): cisService.vcenter.vm.hardware.parallel.Info;
                  };
                  CreateSpec: {
                     (options?: cisService.vcenter.vm.hardware.parallel.CreateSpec): cisService.vcenter.vm.hardware.parallel.CreateSpec;
                  };
                  Summary: {
                     (options?: cisService.vcenter.vm.hardware.parallel.Summary): cisService.vcenter.vm.hardware.parallel.Summary;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.parallel.UpdateSpec): cisService.vcenter.vm.hardware.parallel.UpdateSpec;
                  };
                  BackingSpec: {
                     (options?: cisService.vcenter.vm.hardware.parallel.BackingSpec): cisService.vcenter.vm.hardware.parallel.BackingSpec;
                  };
                  BackingInfo: {
                     (options?: cisService.vcenter.vm.hardware.parallel.BackingInfo): cisService.vcenter.vm.hardware.parallel.BackingInfo;
                  };
               }
               cpu: {
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.cpu.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.cpu.UpdateSpec): Promise<void>;
                  Info: {
                     (options?: cisService.vcenter.vm.hardware.cpu.Info): cisService.vcenter.vm.hardware.cpu.Info;
                  };
                  UpdateSpec: {
                     (options?: cisService.vcenter.vm.hardware.cpu.UpdateSpec): cisService.vcenter.vm.hardware.cpu.UpdateSpec;
                  };
               }
               Version: {
                  "VMX_03": string;
                  "VMX_04": string;
                  "VMX_06": string;
                  "VMX_07": string;
                  "VMX_08": string;
                  "VMX_09": string;
                  "VMX_10": string;
                  "VMX_11": string;
                  "VMX_12": string;
                  "VMX_13": string;
               };
               UpgradePolicy: {
                  "NEVER": string;
                  "AFTER_CLEAN_SHUTDOWN": string;
                  "ALWAYS": string;
               };
               UpgradeStatus: {
                  "NONE": string;
                  "PENDING": string;
                  "SUCCESS": string;
                  "FAILED": string;
               };
               UpdateSpec: {
                  (options?: cisService.vcenter.vm.hardware.UpdateSpec): cisService.vcenter.vm.hardware.UpdateSpec;
               };
               Info: {
                  (options?: cisService.vcenter.vm.hardware.Info): cisService.vcenter.vm.hardware.Info;
               };
               ConnectionState: {
                  "CONNECTED": string;
                  "RECOVERABLE_ERROR": string;
                  "UNRECOVERABLE_ERROR": string;
                  "NOT_CONNECTED": string;
                  "UNKNOWN": string;
               };
               ConnectionInfo: {
                  (options?: cisService.vcenter.vm.hardware.ConnectionInfo): cisService.vcenter.vm.hardware.ConnectionInfo;
               };
               IdeAddressInfo: {
                  (options?: cisService.vcenter.vm.hardware.IdeAddressInfo): cisService.vcenter.vm.hardware.IdeAddressInfo;
               };
               ScsiAddressInfo: {
                  (options?: cisService.vcenter.vm.hardware.ScsiAddressInfo): cisService.vcenter.vm.hardware.ScsiAddressInfo;
               };
               IdeAddressSpec: {
                  (options?: cisService.vcenter.vm.hardware.IdeAddressSpec): cisService.vcenter.vm.hardware.IdeAddressSpec;
               };
               ConnectionCreateSpec: {
                  (options?: cisService.vcenter.vm.hardware.ConnectionCreateSpec): cisService.vcenter.vm.hardware.ConnectionCreateSpec;
               };
               ConnectionUpdateSpec: {
                  (options?: cisService.vcenter.vm.hardware.ConnectionUpdateSpec): cisService.vcenter.vm.hardware.ConnectionUpdateSpec;
               };
               ScsiAddressSpec: {
                  (options?: cisService.vcenter.vm.hardware.ScsiAddressSpec): cisService.vcenter.vm.hardware.ScsiAddressSpec;
               };
               SataAddressInfo: {
                  (options?: cisService.vcenter.vm.hardware.SataAddressInfo): cisService.vcenter.vm.hardware.SataAddressInfo;
               };
               SataAddressSpec: {
                  (options?: cisService.vcenter.vm.hardware.SataAddressSpec): cisService.vcenter.vm.hardware.SataAddressSpec;
               };
            }
            GuestOS: {
               "DOS": string;
               "WIN_31": string;
               "WIN_95": string;
               "WIN_98": string;
               "WIN_ME": string;
               "WIN_NT": string;
               "WIN_2000_PRO": string;
               "WIN_2000_SERV": string;
               "WIN_2000_ADV_SERV": string;
               "WIN_XP_HOME": string;
               "WIN_XP_PRO": string;
               "WIN_XP_PRO_64": string;
               "WIN_NET_WEB": string;
               "WIN_NET_STANDARD": string;
               "WIN_NET_ENTERPRISE": string;
               "WIN_NET_DATACENTER": string;
               "WIN_NET_BUSINESS": string;
               "WIN_NET_STANDARD_64": string;
               "WIN_NET_ENTERPRISE_64": string;
               "WIN_LONGHORN": string;
               "WIN_LONGHORN_64": string;
               "WIN_NET_DATACENTER_64": string;
               "WIN_VISTA": string;
               "WIN_VISTA_64": string;
               "WINDOWS_7": string;
               "WINDOWS_7_64": string;
               "WINDOWS_7_SERVER_64": string;
               "WINDOWS_8": string;
               "WINDOWS_8_64": string;
               "WINDOWS_8_SERVER_64": string;
               "WINDOWS_9": string;
               "WINDOWS_9_64": string;
               "WINDOWS_9_SERVER_64": string;
               "WINDOWS_HYPERV": string;
               "FREEBSD": string;
               "FREEBSD_64": string;
               "REDHAT": string;
               "RHEL_2": string;
               "RHEL_3": string;
               "RHEL_3_64": string;
               "RHEL_4": string;
               "RHEL_4_64": string;
               "RHEL_5": string;
               "RHEL_5_64": string;
               "RHEL_6": string;
               "RHEL_6_64": string;
               "RHEL_7": string;
               "RHEL_7_64": string;
               "CENTOS": string;
               "CENTOS_64": string;
               "CENTOS_6": string;
               "CENTOS_6_64": string;
               "CENTOS_7": string;
               "CENTOS_7_64": string;
               "ORACLE_LINUX": string;
               "ORACLE_LINUX_64": string;
               "ORACLE_LINUX_6": string;
               "ORACLE_LINUX_6_64": string;
               "ORACLE_LINUX_7": string;
               "ORACLE_LINUX_7_64": string;
               "SUSE": string;
               "SUSE_64": string;
               "SLES": string;
               "SLES_64": string;
               "SLES_10": string;
               "SLES_10_64": string;
               "SLES_11": string;
               "SLES_11_64": string;
               "SLES_12": string;
               "SLES_12_64": string;
               "NLD_9": string;
               "OES": string;
               "SJDS": string;
               "MANDRAKE": string;
               "MANDRIVA": string;
               "MANDRIVA_64": string;
               "TURBO_LINUX": string;
               "TURBO_LINUX_64": string;
               "UBUNTU": string;
               "UBUNTU_64": string;
               "DEBIAN_4": string;
               "DEBIAN_4_64": string;
               "DEBIAN_5": string;
               "DEBIAN_5_64": string;
               "DEBIAN_6": string;
               "DEBIAN_6_64": string;
               "DEBIAN_7": string;
               "DEBIAN_7_64": string;
               "DEBIAN_8": string;
               "DEBIAN_8_64": string;
               "DEBIAN_9": string;
               "DEBIAN_9_64": string;
               "DEBIAN_10": string;
               "DEBIAN_10_64": string;
               "ASIANUX_3": string;
               "ASIANUX_3_64": string;
               "ASIANUX_4": string;
               "ASIANUX_4_64": string;
               "ASIANUX_5_64": string;
               "ASIANUX_7_64": string;
               "OPENSUSE": string;
               "OPENSUSE_64": string;
               "FEDORA": string;
               "FEDORA_64": string;
               "COREOS_64": string;
               "VMWARE_PHOTON_64": string;
               "OTHER_24X_LINUX": string;
               "OTHER_24X_LINUX_64": string;
               "OTHER_26X_LINUX": string;
               "OTHER_26X_LINUX_64": string;
               "OTHER_3X_LINUX": string;
               "OTHER_3X_LINUX_64": string;
               "OTHER_LINUX": string;
               "GENERIC_LINUX": string;
               "OTHER_LINUX_64": string;
               "SOLARIS_6": string;
               "SOLARIS_7": string;
               "SOLARIS_8": string;
               "SOLARIS_9": string;
               "SOLARIS_10": string;
               "SOLARIS_10_64": string;
               "SOLARIS_11_64": string;
               "OS2": string;
               "ECOMSTATION": string;
               "ECOMSTATION_2": string;
               "NETWARE_4": string;
               "NETWARE_5": string;
               "NETWARE_6": string;
               "OPENSERVER_5": string;
               "OPENSERVER_6": string;
               "UNIXWARE_7": string;
               "DARWIN": string;
               "DARWIN_64": string;
               "DARWIN_10": string;
               "DARWIN_10_64": string;
               "DARWIN_11": string;
               "DARWIN_11_64": string;
               "DARWIN_12_64": string;
               "DARWIN_13_64": string;
               "DARWIN_14_64": string;
               "DARWIN_15_64": string;
               "DARWIN_16_64": string;
               "VMKERNEL": string;
               "VMKERNEL_5": string;
               "VMKERNEL_6": string;
               "VMKERNEL_65": string;
               "OTHER": string;
               "OTHER_64": string;
            };
         }
         VM: {
            get(vm: string): Promise<cisService.vcenter.VM.Info>;
            create(spec: cisService.vcenter.VM.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.VM.FilterSpec): Promise<Array<cisService.vcenter.VM.Summary>>;
            delete(vm: string): Promise<void>;
            CreateSpec: {
               (options?: cisService.vcenter.VM.CreateSpec): cisService.vcenter.VM.CreateSpec;
            };
            PlacementSpec: {
               (options?: cisService.vcenter.VM.PlacementSpec): cisService.vcenter.VM.PlacementSpec;
            };
            Summary: {
               (options?: cisService.vcenter.VM.Summary): cisService.vcenter.VM.Summary;
            };
            Info: {
               (options?: cisService.vcenter.VM.Info): cisService.vcenter.VM.Info;
            };
            FilterSpec: {
               (options?: cisService.vcenter.VM.FilterSpec): cisService.vcenter.VM.FilterSpec;
            };
         }
         folder: {
            list(filter: cisService.vcenter.folder.FilterSpec): Promise<Array<cisService.vcenter.folder.Summary>>;
            Type: {
               "DATACENTER": string;
               "DATASTORE": string;
               "HOST": string;
               "NETWORK": string;
               "VIRTUAL_MACHINE": string;
            };
            FilterSpec: {
               (options?: cisService.vcenter.folder.FilterSpec): cisService.vcenter.folder.FilterSpec;
            };
            Summary: {
               (options?: cisService.vcenter.folder.Summary): cisService.vcenter.folder.Summary;
            };
         }
         network: {
            list(filter: cisService.vcenter.network.FilterSpec): Promise<Array<cisService.vcenter.network.Summary>>;
            Type: {
               "STANDARD_PORTGROUP": string;
               "DISTRIBUTED_PORTGROUP": string;
               "OPAQUE_NETWORK": string;
            };
            FilterSpec: {
               (options?: cisService.vcenter.network.FilterSpec): cisService.vcenter.network.FilterSpec;
            };
            Summary: {
               (options?: cisService.vcenter.network.Summary): cisService.vcenter.network.Summary;
            };
         }
         cluster: {
            get(cluster: string): Promise<cisService.vcenter.cluster.Info>;
            list(filter: cisService.vcenter.cluster.FilterSpec): Promise<Array<cisService.vcenter.cluster.Summary>>;
            FilterSpec: {
               (options?: cisService.vcenter.cluster.FilterSpec): cisService.vcenter.cluster.FilterSpec;
            };
            Info: {
               (options?: cisService.vcenter.cluster.Info): cisService.vcenter.cluster.Info;
            };
            Summary: {
               (options?: cisService.vcenter.cluster.Summary): cisService.vcenter.cluster.Summary;
            };
         }
         resourcePool: {
            get(resourcePool: string): Promise<cisService.vcenter.resourcePool.Info>;
            list(filter: cisService.vcenter.resourcePool.FilterSpec): Promise<Array<cisService.vcenter.resourcePool.Summary>>;
            FilterSpec: {
               (options?: cisService.vcenter.resourcePool.FilterSpec): cisService.vcenter.resourcePool.FilterSpec;
            };
            Info: {
               (options?: cisService.vcenter.resourcePool.Info): cisService.vcenter.resourcePool.Info;
            };
            Summary: {
               (options?: cisService.vcenter.resourcePool.Summary): cisService.vcenter.resourcePool.Summary;
            };
         }
         datacenter: {
            get(datacenter: string): Promise<cisService.vcenter.datacenter.Info>;
            create(spec: cisService.vcenter.datacenter.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.datacenter.FilterSpec): Promise<Array<cisService.vcenter.datacenter.Summary>>;
            delete(datacenter: string, force: boolean): Promise<void>;
            FilterSpec: {
               (options?: cisService.vcenter.datacenter.FilterSpec): cisService.vcenter.datacenter.FilterSpec;
            };
            Summary: {
               (options?: cisService.vcenter.datacenter.Summary): cisService.vcenter.datacenter.Summary;
            };
            CreateSpec: {
               (options?: cisService.vcenter.datacenter.CreateSpec): cisService.vcenter.datacenter.CreateSpec;
            };
            Info: {
               (options?: cisService.vcenter.datacenter.Info): cisService.vcenter.datacenter.Info;
            };
         }
         datastore: {
            get(datastore: string): Promise<cisService.vcenter.datastore.Info>;
            list(filter: cisService.vcenter.datastore.FilterSpec): Promise<Array<cisService.vcenter.datastore.Summary>>;
            Type: {
               "VMFS": string;
               "NFS": string;
               "NFS41": string;
               "CIFS": string;
               "VSAN": string;
               "VFFS": string;
               "VVOL": string;
            };
            Info: {
               (options?: cisService.vcenter.datastore.Info): cisService.vcenter.datastore.Info;
            };
            FilterSpec: {
               (options?: cisService.vcenter.datastore.FilterSpec): cisService.vcenter.datastore.FilterSpec;
            };
            Summary: {
               (options?: cisService.vcenter.datastore.Summary): cisService.vcenter.datastore.Summary;
            };
         }
         host: {
            disconnect(host: string): Promise<void>;
            create(spec: cisService.vcenter.host.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.host.FilterSpec): Promise<Array<cisService.vcenter.host.Summary>>;
            delete(host: string): Promise<void>;
            connect(host: string): Promise<void>;
            PowerState: {
               "POWERED_ON": string;
               "POWERED_OFF": string;
               "STANDBY": string;
            };
            ConnectionState: {
               "CONNECTED": string;
               "DISCONNECTED": string;
               "NOT_RESPONDING": string;
            };
            FilterSpec: {
               (options?: cisService.vcenter.host.FilterSpec): cisService.vcenter.host.FilterSpec;
            };
            CreateSpec: {
               (options?: cisService.vcenter.host.CreateSpec): cisService.vcenter.host.CreateSpec;
               ThumbprintVerification: {
                  "NONE": string;
                  "THUMBPRINT": string;
               }
            };
            Summary: {
               (options?: cisService.vcenter.host.Summary): cisService.vcenter.host.Summary;
            };
         }
      }
      ovf: {
         importFlag: {
            list(rp: string): Promise<Array<cisService.ovf.importFlag.Info>>;
            Info: {
               (options?: cisService.ovf.importFlag.Info): cisService.ovf.importFlag.Info;
            };
         }
         capability: {
            get(serverGuid: string): Promise<cisService.ovf.capability.CapabilityInfo>;
            CapabilityInfo: {
               (options?: cisService.ovf.capability.CapabilityInfo): cisService.ovf.capability.CapabilityInfo;
            };
         }
         exportFlag: {
            list(): Promise<Array<cisService.ovf.exportFlag.Info>>;
            Info: {
               (options?: cisService.ovf.exportFlag.Info): cisService.ovf.exportFlag.Info;
            };
         }
         exportSession: {
            preview(source: cisService.ovf.exportSession.SourceInfo, previewSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<cisService.ovf.exportSession.Preview>;
            get(id: string): Promise<cisService.ovf.exportSession.Info>;
            create(clientToken: string, source: cisService.ovf.exportSession.SourceInfo, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
            progress(id: string, percent: number): Promise<void>;
            delete(id: string): Promise<void>;
            State: {
               "EXPORT_PREPARING": string;
               "EXPORT_READY": string;
               "EXPORT_IN_PROGRESS": string;
               "EXPORT_COMPLETED": string;
               "EXPORT_ERROR": string;
            };
            TargetType: {
               "DOWNLOAD_TARGET": string;
               "CONTENT_LIBRARY_TARGET": string;
            };
            TargetContentType: {
               "OVF_TARGET": string;
               "OVA_TARGET": string;
            };
            SourceInfo: {
               (options?: cisService.ovf.exportSession.SourceInfo): cisService.ovf.exportSession.SourceInfo;
            };
            PreviewSpec: {
               (options?: cisService.ovf.exportSession.PreviewSpec): cisService.ovf.exportSession.PreviewSpec;
            };
            Info: {
               (options?: cisService.ovf.exportSession.Info): cisService.ovf.exportSession.Info;
            };
            CreateSpec: {
               (options?: cisService.ovf.exportSession.CreateSpec): cisService.ovf.exportSession.CreateSpec;
            };
            Preview: {
               (options?: cisService.ovf.exportSession.Preview): cisService.ovf.exportSession.Preview;
            };
            PreviewFile: {
               (options?: cisService.ovf.exportSession.PreviewFile): cisService.ovf.exportSession.PreviewFile;
            };
         }
         probeImportSession: {
            createProbeImportSession(clientToken: string, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
            get(id: string): Promise<cisService.ovf.probeImportSession.Info>;
            tryInstantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<cisService.ovf.importSession.OvfValidationResult>;
            delete(id: string): Promise<void>;
            State: {
               "PROBE_IMPORT_OVF_TRANSFER": string;
               "PROBE_IMPORT_MSG_BUNDLES_TRANSFER": string;
               "PROBE_IMPORT_SELECTING_OVF_PARAMS": string;
               "PROBE_IMPORT_ERROR": string;
            };
            Info: {
               (options?: cisService.ovf.probeImportSession.Info): cisService.ovf.probeImportSession.Info;
            };
         }
         importSession: {
            preview(ovfDescriptor: string): Promise<cisService.ovf.importSession.Preview>;
            get(id: string): Promise<cisService.ovf.importSession.Info>;
            tryInstantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<cisService.ovf.importSession.OvfValidationResult>;
            instantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<void>;
            delete(id: string): Promise<void>;
            createForResourcePool(clientToken: string, resourcePool: string, hostSystem: string, folder: string, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
            PushSourceContentType: {
               "OVF_SOURCE": string;
               "OVA_SOURCE": string;
            };
            State: {
               "IMPORT_OVF_TRANSFER": string;
               "IMPORT_MSG_BUNDLES_TRANSFER": string;
               "IMPORT_SELECTING_OVF_PARAMS": string;
               "IMPORT_FILE_TRANSFER": string;
               "IMPORT_INSTANTIATING": string;
               "IMPORT_COMPLETED": string;
               "IMPORT_ERROR": string;
            };
            PushSourceOvfOption: {
               "MANIFEST": string;
               "MANIFEST_CERTIFICATE": string;
               "NONE": string;
            };
            SourceType: {
               "PUSH_SOURCE": string;
               "PULL_SOURCE": string;
               "CONTENT_LIBRARY_SOURCE": string;
            };
            Preview: {
               (options?: cisService.ovf.importSession.Preview): cisService.ovf.importSession.Preview;
            };
            Info: {
               (options?: cisService.ovf.importSession.Info): cisService.ovf.importSession.Info;
            };
            CreateSpec: {
               (options?: cisService.ovf.importSession.CreateSpec): cisService.ovf.importSession.CreateSpec;
            };
            OvfValidationResult: {
               (options?: cisService.ovf.importSession.OvfValidationResult): cisService.ovf.importSession.OvfValidationResult;
            };
            PreviewFile: {
               (options?: cisService.ovf.importSession.PreviewFile): cisService.ovf.importSession.PreviewFile;
            };
         }
         libraryItem: {
            filter(ovfLibraryItemId: string, target: cisService.ovf.libraryItem.DeploymentTarget): Promise<cisService.ovf.libraryItem.OvfSummary>;
            create(clientToken: string, source: cisService.ovf.libraryItem.DeployableIdentity, target: cisService.ovf.libraryItem.CreateTarget, createSpec: cisService.ovf.libraryItem.CreateSpec): Promise<cisService.ovf.libraryItem.CreateResult>;
            deploy(clientToken: string, ovfLibraryItemId: string, target: cisService.ovf.libraryItem.DeploymentTarget, deploymentSpec: cisService.ovf.libraryItem.ResourcePoolDeploymentSpec): Promise<cisService.ovf.libraryItem.DeploymentResult>;
            DeploymentTarget: {
               (options?: cisService.ovf.libraryItem.DeploymentTarget): cisService.ovf.libraryItem.DeploymentTarget;
            };
            CreateResult: {
               (options?: cisService.ovf.libraryItem.CreateResult): cisService.ovf.libraryItem.CreateResult;
            };
            ResultInfo: {
               (options?: cisService.ovf.libraryItem.ResultInfo): cisService.ovf.libraryItem.ResultInfo;
            };
            OvfSummary: {
               (options?: cisService.ovf.libraryItem.OvfSummary): cisService.ovf.libraryItem.OvfSummary;
            };
            DeploymentResult: {
               (options?: cisService.ovf.libraryItem.DeploymentResult): cisService.ovf.libraryItem.DeploymentResult;
            };
            CreateSpec: {
               (options?: cisService.ovf.libraryItem.CreateSpec): cisService.ovf.libraryItem.CreateSpec;
            };
            DeployableIdentity: {
               (options?: cisService.ovf.libraryItem.DeployableIdentity): cisService.ovf.libraryItem.DeployableIdentity;
            };
            ResourcePoolDeploymentSpec: {
               (options?: cisService.ovf.libraryItem.ResourcePoolDeploymentSpec): cisService.ovf.libraryItem.ResourcePoolDeploymentSpec;
            };
            CreateTarget: {
               (options?: cisService.ovf.libraryItem.CreateTarget): cisService.ovf.libraryItem.CreateTarget;
            };
            StorageGroupMapping: {
               (options?: cisService.ovf.libraryItem.StorageGroupMapping): cisService.ovf.libraryItem.StorageGroupMapping;
               Type: {
                  "DATASTORE": string;
                  "STORAGE_PROFILE": string;
               }
            };
         }
         DiskProvisioningType: {
            "thin": string;
            "thick": string;
            "eagerZeroedThick": string;
         };
         ExtraConfig: {
            (options?: cisService.ovf.ExtraConfig): cisService.ovf.ExtraConfig;
         };
         ScaleOutParams: {
            (options?: cisService.ovf.ScaleOutParams): cisService.ovf.ScaleOutParams;
         };
         StorageMappingParams: {
            (options?: cisService.ovf.StorageMappingParams): cisService.ovf.StorageMappingParams;
         };
         TargetNetwork: {
            (options?: cisService.ovf.TargetNetwork): cisService.ovf.TargetNetwork;
            InaccessibleReason: {
               "NO_ASSIGN_RIGHT": string;
            }
         };
         DatastoreDiskGroup: {
            (options?: cisService.ovf.DatastoreDiskGroup): cisService.ovf.DatastoreDiskGroup;
         };
         OvfParams: {
            (options?: cisService.ovf.OvfParams): cisService.ovf.OvfParams;
         };
         DatastoreTarget: {
            (options?: cisService.ovf.DatastoreTarget): cisService.ovf.DatastoreTarget;
            InaccessibleReason: {
               "NOT_CONNECTED": string;
               "MAINTENANCE_MODE": string;
               "READ_ONLY": string;
               "NO_ALLOCATE_RIGHT": string;
            }
         };
         SourceNetwork: {
            (options?: cisService.ovf.SourceNetwork): cisService.ovf.SourceNetwork;
         };
         OvfError: {
            (options?: cisService.ovf.OvfError): cisService.ovf.OvfError;
         };
         PropertyParams: {
            (options?: cisService.ovf.PropertyParams): cisService.ovf.PropertyParams;
         };
         Property: {
            (options?: cisService.ovf.Property): cisService.ovf.Property;
         };
         DeploymentOption: {
            (options?: cisService.ovf.DeploymentOption): cisService.ovf.DeploymentOption;
         };
         ExtraConfigParams: {
            (options?: cisService.ovf.ExtraConfigParams): cisService.ovf.ExtraConfigParams;
         };
         StorageDiskGroup: {
            (options?: cisService.ovf.StorageDiskGroup): cisService.ovf.StorageDiskGroup;
         };
         VcenterExtensionParams: {
            (options?: cisService.ovf.VcenterExtensionParams): cisService.ovf.VcenterExtensionParams;
         };
         IpAllocationParams: {
            (options?: cisService.ovf.IpAllocationParams): cisService.ovf.IpAllocationParams;
            IpProtocol: {
               "IPV4": string;
               "IPV6": string;
            }
            IpAllocationPolicy: {
               "DHCP": string;
               "TRANSIENT_IPPOOL": string;
               "STATIC_MANUAL": string;
               "STATIC_IPPOOL": string;
            }
            IpAllocationScheme: {
               "DHCP": string;
               "OVF_ENVIRONMENT": string;
            }
         };
         OvfWarning: {
            (options?: cisService.ovf.OvfWarning): cisService.ovf.OvfWarning;
         };
         VServiceParams: {
            (options?: cisService.ovf.VServiceParams): cisService.ovf.VServiceParams;
         };
         VcenterGuestCustomizationParams: {
            (options?: cisService.ovf.VcenterGuestCustomizationParams): cisService.ovf.VcenterGuestCustomizationParams;
         };
         StorageProfileTarget: {
            (options?: cisService.ovf.StorageProfileTarget): cisService.ovf.StorageProfileTarget;
         };
         DatastoreMappingParams: {
            (options?: cisService.ovf.DatastoreMappingParams): cisService.ovf.DatastoreMappingParams;
         };
         VServiceProvider: {
            (options?: cisService.ovf.VServiceProvider): cisService.ovf.VServiceProvider;
            BindingStatus: {
               "RED": string;
               "YELLOW": string;
               "GREEN": string;
            }
         };
         OvfMessage: {
            (options?: cisService.ovf.OvfMessage): cisService.ovf.OvfMessage;
            Category: {
               "VALIDATION": string;
               "INPUT": string;
               "SERVER": string;
            }
         };
         ScaleOutGroup: {
            (options?: cisService.ovf.ScaleOutGroup): cisService.ovf.ScaleOutGroup;
         };
         SizeParams: {
            (options?: cisService.ovf.SizeParams): cisService.ovf.SizeParams;
         };
         VServiceDependency: {
            (options?: cisService.ovf.VServiceDependency): cisService.ovf.VServiceDependency;
         };
         CertificateParams: {
            (options?: cisService.ovf.CertificateParams): cisService.ovf.CertificateParams;
         };
         NameAndProductParams: {
            (options?: cisService.ovf.NameAndProductParams): cisService.ovf.NameAndProductParams;
         };
         NetworkMappingParams: {
            (options?: cisService.ovf.NetworkMappingParams): cisService.ovf.NetworkMappingParams;
         };
         UnknownSection: {
            (options?: cisService.ovf.UnknownSection): cisService.ovf.UnknownSection;
         };
         OvfFileInfo: {
            (options?: cisService.ovf.OvfFileInfo): cisService.ovf.OvfFileInfo;
            FileType: {
               "OVF": string;
               "MANIFEST": string;
               "CERT": string;
               "MSG_BUNDLE": string;
               "DISK": string;
               "CONTENT": string;
               "OVA": string;
            }
         };
         VcenterGuestCustomization: {
            (options?: cisService.ovf.VcenterGuestCustomization): cisService.ovf.VcenterGuestCustomization;
            Type: {
               "SPECIFICATION": string;
               "XML": string;
            }
         };
         EulaParams: {
            (options?: cisService.ovf.EulaParams): cisService.ovf.EulaParams;
         };
         OvfInfo: {
            (options?: cisService.ovf.OvfInfo): cisService.ovf.OvfInfo;
         };
         UnknownSectionParams: {
            (options?: cisService.ovf.UnknownSectionParams): cisService.ovf.UnknownSectionParams;
         };
         DeploymentOptionParams: {
            (options?: cisService.ovf.DeploymentOptionParams): cisService.ovf.DeploymentOptionParams;
         };
         ParseIssue: {
            (options?: cisService.ovf.ParseIssue): cisService.ovf.ParseIssue;
            Category: {
               "VALUE_ILLEGAL": string;
               "ATTRIBUTE_REQUIRED": string;
               "ATTRIBUTE_ILLEGAL": string;
               "ELEMENT_REQUIRED": string;
               "ELEMENT_ILLEGAL": string;
               "ELEMENT_UNKNOWN": string;
               "SECTION_UNKNOWN": string;
               "SECTION_RESTRICTION": string;
               "PARSE_ERROR": string;
               "GENERATE_ERROR": string;
               "VALIDATION_ERROR": string;
               "EXPORT_ERROR": string;
               "INTERNAL_ERROR": string;
            }
         };
      }
   }
   namespace cisService {
      interface builtin {
      }
      namespace builtin {
         interface ANYERROR {
            value: string;
         }
         interface BINARY {
            value: string;
         }
         interface BOOLEAN {
            value: string;
         }
         interface DATETIME {
            value: string;
         }
         interface DOUBLE {
            value: string;
         }
         interface DYNAMICSTRUCTURE {
            value: string;
         }
         interface ID {
            value: string;
         }
         interface LONG {
            value: string;
         }
         interface OPAQUE {
            value: string;
         }
         interface SECRET {
            value: string;
         }
         interface STRING {
            value: string;
         }
         interface URI {
            value: string;
         }
         interface VOID {
            value: string;
         }
      }
      interface applmgmt {
         access: applmgmt.access;
         techpreview: applmgmt.techpreview;
         health: applmgmt.health;
         networking: applmgmt.networking;
         monitoring: applmgmt.monitoring;
         system: applmgmt.system;
         recovery: applmgmt.recovery;
      }
      namespace applmgmt {
         interface access {
            consolecli: access.consolecli;
            shell: access.shell;
            dcui: access.dcui;
            ssh: access.ssh;
         }
         namespace access {
            interface consolecli {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
            namespace consolecli {
            }
            interface shell {
               set(config: cisService.applmgmt.access.shell.ShellConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.access.shell.ShellConfig>;
            }
            namespace shell {
               interface ShellConfig {
                  enabled: boolean;
                  timeout: number;
               }
            }
            interface dcui {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
            namespace dcui {
            }
            interface ssh {
               set(enabled: boolean): Promise<void>;
               get(): Promise<boolean>;
            }
            namespace ssh {
            }
         }
         interface techpreview {
            system: techpreview.system;
            monitoring: techpreview.monitoring;
            localaccounts: techpreview.localaccounts;
            networking: techpreview.networking;
            services: techpreview.services;
            ntp: techpreview.ntp;
            shutdown: techpreview.shutdown;
            timesync: techpreview.timesync;
         }
         namespace techpreview {
            interface system {
               update: system.update;
            }
            namespace system {
               interface update {
                  set(config: cisService.applmgmt.techpreview.system.update.UpdateStructSet): Promise<void>;
                  get(): Promise<cisService.applmgmt.techpreview.system.update.UpdateStructGet>;
               }
               namespace update {
                  enum UpdateDay {
                     "Monday",
                     "Tuesday",
                     "Friday",
                     "Wednesday",
                     "Thursday",
                     "Saturday",
                     "Sunday",
                     "Everyday",
                  }
                  enum AutoUpdateNotification {
                     "disabled",
                     "enabled",
                  }
                  interface UpdateStructSet {
                     current_URL: string;
                     check_updates: cisService.applmgmt.techpreview.system.update.AutoUpdateNotification;
                     time: string;
                     day: cisService.applmgmt.techpreview.system.update.UpdateDay;
                     username: string;
                     password: string;
                  }
                  interface UpdateStructGet {
                     current_URL: string;
                     default_URL: string;
                     check_updates: cisService.applmgmt.techpreview.system.update.AutoUpdateNotification;
                     time: string;
                     day: cisService.applmgmt.techpreview.system.update.UpdateDay;
                     latest_update_install_time: string;
                     latest_update_query_time: string;
                     username: string;
                     password: string;
                  }
               }
            }
            interface monitoring {
               snmp: monitoring.snmp;
            }
            namespace monitoring {
               interface snmp {
                  set(config: cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfig): Promise<void>;
                  test(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPTestResults>;
                  stats(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPStats>;
                  enable(): Promise<void>;
                  disable(): Promise<void>;
                  get(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPConfigReadOnly>;
                  reset(): Promise<void>;
                  hash(config: cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashConfig): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPHashResults>;
                  limits(): Promise<cisService.applmgmt.techpreview.monitoring.snmp.SNMPLimits>;
               }
               namespace snmp {
                  enum SNMPv3Notfication {
                     "inform",
                     "trap",
                  }
                  enum SNMPPrivProto {
                     "AES128",
                     "none",
                  }
                  enum SNMPAuthProto {
                     "none",
                     "SHA1",
                     "MD5",
                  }
                  enum SNMPSecLevel {
                     "none",
                     "auth",
                     "priv",
                  }
                  interface SNMPConfigReadOnly {
                     authentication: cisService.applmgmt.techpreview.monitoring.snmp.SNMPAuthProto;
                     communities: Array<string>;
                     enable: boolean;
                     engineid: string;
                     loglevel: string;
                     notraps: Array<string>;
                     port: number;
                     privacy: cisService.applmgmt.techpreview.monitoring.snmp.SNMPPrivProto;
                     syscontact: string;
                     syslocation: string;
                     targets: Array<cisService.applmgmt.techpreview.monitoring.snmp.SNMPv1TrapTarget>;
                     users: Array<cisService.applmgmt.techpreview.monitoring.snmp.SNMPUser>;
                     remoteusers: Array<cisService.applmgmt.techpreview.monitoring.snmp.SNMPRemoteUser>;
                     v3targets: Array<cisService.applmgmt.techpreview.monitoring.snmp.SNMPv3Target>;
                     pid: string;
                  }
                  interface SNMPConfig {
                     authentication: cisService.applmgmt.techpreview.monitoring.snmp.SNMPAuthProto;
                     communities: Array<string>;
                     engineid: string;
                     loglevel: string;
                     notraps: Array<string>;
                     port: number;
                     privacy: cisService.applmgmt.techpreview.monitoring.snmp.SNMPPrivProto;
                     remoteusers: Array<string>;
                     syscontact: string;
                     syslocation: string;
                     targets: Array<string>;
                     users: Array<string>;
                     v3targets: Array<string>;
                  }
                  interface SNMPv3Target {
                     type: cisService.applmgmt.techpreview.monitoring.snmp.SNMPv3Notfication;
                     sec_level: cisService.applmgmt.techpreview.monitoring.snmp.SNMPSecLevel;
                     ip: string;
                     port: number;
                     user: string;
                  }
                  interface SNMPLimits {
                     max_communities: number;
                     max_trap_destinations_v1: number;
                     max_destinations_v3: number;
                     max_notification_filters: number;
                     max_community_length: number;
                     max_buffer_size: number;
                  }
                  interface SNMPUser {
                     username: string;
                     sec_level: cisService.applmgmt.techpreview.monitoring.snmp.SNMPSecLevel;
                     auth_key: string;
                     priv_key: string;
                  }
                  interface SNMPStats {
                     sysuptime: string;
                     worstrtimelast: string;
                     avgresponsetime: string;
                     worstresponsetime: string;
                     inpkts: number;
                     outpkts: number;
                     usmstatsnotintimewindows: number;
                     usmstatsunknownusernames: number;
                     usmstatsunknownengineids: number;
                     usmstatswrongdigests: number;
                     usmstatsdecryptionerrors: number;
                     inbadversions: number;
                     inbadcommunitynames: number;
                     inbadcommunityuses: number;
                     inasnparseerrs: number;
                     intoobigs: number;
                     innosuchnames: number;
                     inbadvalues: number;
                     ingenerrs: number;
                     outtoobigs: number;
                     outnosuchnames: number;
                     outbadvalues: number;
                     outgenerrs: number;
                     outtraps: number;
                     silentdrops: number;
                     avgvarbinds: number;
                     maxvarbinds: number;
                  }
                  interface SNMPv1TrapTarget {
                     ip: string;
                     port: number;
                     community: string;
                  }
                  interface SNMPTestResults {
                     success: boolean;
                     message: string;
                  }
                  interface SNMPRemoteUser {
                     username: string;
                     sec_level: cisService.applmgmt.techpreview.monitoring.snmp.SNMPSecLevel;
                     authentication: cisService.applmgmt.techpreview.monitoring.snmp.SNMPAuthProto;
                     auth_key: string;
                     privacy: cisService.applmgmt.techpreview.monitoring.snmp.SNMPPrivProto;
                     priv_key: string;
                     engineid: string;
                  }
                  interface SNMPHashConfig {
                     auth_hash: string;
                     priv_hash: string;
                     raw_secret: boolean;
                  }
                  interface SNMPHashResults {
                     auth_key: string;
                     priv_key: string;
                  }
               }
            }
            interface localaccounts {
               user: localaccounts.user;
            }
            namespace localaccounts {
               interface user {
                  add(config: cisService.applmgmt.techpreview.localaccounts.user.NewUserConfig): Promise<void>;
                  set(config: cisService.applmgmt.techpreview.localaccounts.user.UserConfig): Promise<void>;
                  get(username: string): Promise<cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.localaccounts.user.UserConfigGet>>;
                  delete(username: string): Promise<void>;
               }
               namespace user {
                  enum UserPasswordStatus {
                     "notset",
                     "expired",
                     "valid",
                  }
                  enum UserAccountStatus {
                     "disabled",
                     "enabled",
                  }
                  enum UserRole {
                     "admin",
                     "operator",
                     "superAdmin",
                  }
                  interface NewUserConfig {
                     username: string;
                     role?: cisService.applmgmt.techpreview.localaccounts.user.UserRole;
                     password: string;
                     fullname?: string;
                     email?: string;
                  }
                  interface UserConfig {
                     username: string;
                     role: cisService.applmgmt.techpreview.localaccounts.user.UserRole;
                     fullname: string;
                     status: cisService.applmgmt.techpreview.localaccounts.user.UserAccountStatus;
                     email: string;
                  }
                  interface UserConfigGet {
                     username: string;
                     role: cisService.applmgmt.techpreview.localaccounts.user.UserRole;
                     fullname: string;
                     status: cisService.applmgmt.techpreview.localaccounts.user.UserAccountStatus;
                     passwordstatus: cisService.applmgmt.techpreview.localaccounts.user.UserPasswordStatus;
                     email: string;
                  }
               }
            }
            interface networking {
               proxy: networking.proxy;
               ipv4: networking.ipv4;
               ipv6: networking.ipv6;
               routes: networking.routes;
               firewall: networking.firewall;
            }
            namespace networking {
               interface proxy {
                  set(config: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple): Promise<void>;
                  test(config: cisService.applmgmt.techpreview.networking.proxy.ProxyConfigTest): Promise<cisService.applmgmt.techpreview.networking.proxy.TestStatusInfo>;
                  get(): Promise<cisService.applmgmt.techpreview.networking.proxy.ProxyConfigMultiple>;
                  delete(protocol: cisService.applmgmt.techpreview.networking.proxy.ProxyProtocol): Promise<void>;
               }
               namespace proxy {
                  enum TestStatus {
                     "orange",
                     "green",
                     "red",
                  }
                  enum ProxyProtocol {
                     "ftp",
                     "http",
                     "https",
                  }
                  enum MessageStatus {
                     "failure",
                     "success",
                  }
                  enum ProxyStatus {
                     "disabled",
                     "enabled",
                  }
                  interface TestStatusInfo {
                     status: cisService.applmgmt.techpreview.networking.proxy.TestStatus;
                     messages: Array<cisService.applmgmt.techpreview.networking.proxy.Message>;
                  }
                  interface Message {
                     message: string;
                     result: cisService.applmgmt.techpreview.networking.proxy.MessageStatus;
                  }
                  interface ProxyConfigMultiple {
                     status: cisService.applmgmt.techpreview.networking.proxy.ProxyStatus;
                     configlist: Array<cisService.applmgmt.techpreview.networking.proxy.ProxyConfig>;
                  }
                  interface ProxyConfig {
                     protocol: cisService.applmgmt.techpreview.networking.proxy.ProxyProtocol;
                     server: string;
                     port: number;
                     username: string;
                     password: string;
                  }
                  interface ProxyConfigTest {
                     protocol: cisService.applmgmt.techpreview.networking.proxy.ProxyProtocol;
                     server: string;
                     port: number;
                     username: string;
                     password: string;
                     testhost: string;
                  }
               }
               interface ipv4 {
                  set(config: Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4Config>): Promise<void>;
                  get(interfaces: Array<string>): Promise<Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly>>;
                  renew(interfaces: Array<string>): Promise<void>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.ipv4.IPv4ConfigReadOnly>>;
               }
               namespace ipv4 {
                  enum IPv4Mode {
                     "dhcp",
                     "is_static",
                     "unconfigured",
                  }
                  interface IPv4ConfigReadOnly {
                     interface_name: string;
                     mode: cisService.applmgmt.techpreview.networking.ipv4.IPv4Mode;
                     address: string;
                     prefix: number;
                     default_gateway: string;
                     updateable: boolean;
                  }
                  interface IPv4Config {
                     interface_name: string;
                     mode: cisService.applmgmt.techpreview.networking.ipv4.IPv4Mode;
                     address: string;
                     prefix: number;
                     default_gateway: string;
                  }
               }
               interface ipv6 {
                  set(config: Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6Config>): Promise<void>;
                  get(interfaces: Array<string>): Promise<Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly>>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6ConfigReadOnly>>;
               }
               namespace ipv6 {
                  enum IPv6AddressStatus {
                     "tentative",
                     "unknown",
                     "inaccessible",
                     "invalid",
                     "duplicate",
                     "preferred",
                     "deprecated",
                     "optimistic",
                  }
                  enum IPv6AddressOrigin {
                     "dhcp",
                     "random",
                     "manual",
                     "other",
                     "linklayer",
                  }
                  interface IPv6ConfigReadOnly {
                     interface_name: string;
                     dhcp: boolean;
                     autoconf: boolean;
                     addresses: Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6AddressReadOnly>;
                     default_gateway: string;
                     updateable: boolean;
                  }
                  interface IPv6Config {
                     interface_name: string;
                     dhcp: boolean;
                     autoconf: boolean;
                     addresses: Array<cisService.applmgmt.techpreview.networking.ipv6.IPv6Address>;
                     default_gateway: string;
                  }
                  interface IPv6Address {
                     address: string;
                     prefix: number;
                  }
                  interface IPv6AddressReadOnly {
                     address: string;
                     prefix: number;
                     origin: cisService.applmgmt.techpreview.networking.ipv6.IPv6AddressOrigin;
                     status: cisService.applmgmt.techpreview.networking.ipv6.IPv6AddressStatus;
                  }
               }
               interface routes {
                  add(route: cisService.applmgmt.techpreview.networking.routes.Route): Promise<void>;
                  set(routes: Array<cisService.applmgmt.techpreview.networking.routes.Route>): Promise<void>;
                  test(gateways: Array<string>): Promise<cisService.applmgmt.techpreview.networking.routes.TestStatusInfo>;
                  list(): Promise<Array<cisService.applmgmt.techpreview.networking.routes.RouteReadOnly>>;
                  delete(route: cisService.applmgmt.techpreview.networking.routes.Route): Promise<void>;
               }
               namespace routes {
                  enum MessageStatus {
                     "failure",
                     "success",
                  }
                  enum TestStatus {
                     "orange",
                     "green",
                     "red",
                  }
                  interface TestStatusInfo {
                     status: cisService.applmgmt.techpreview.networking.routes.TestStatus;
                     messages: Array<cisService.applmgmt.techpreview.networking.routes.Message>;
                  }
                  interface RouteReadOnly {
                     destination: string;
                     prefix: number;
                     gateway: string;
                     interface_name: string;
                     is_static: boolean;
                  }
                  interface Message {
                     message: string;
                     result: cisService.applmgmt.techpreview.networking.routes.MessageStatus;
                  }
                  interface Route {
                     destination: string;
                     prefix: number;
                     gateway: string;
                     interface_name: string;
                  }
               }
               interface firewall {
                  addr: firewall.addr;
               }
               namespace firewall {
                  interface addr {
                     inbound: addr.inbound;
                  }
                  namespace addr {
                     interface inbound {
                        add(pos: number, rule: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule): Promise<void>;
                        set(rules: Array<cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule>): Promise<void>;
                        list(): Promise<Array<cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallAddressRule>>;
                        delete(config: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.DeleteFirewallRule): Promise<void>;
                     }
                     namespace inbound {
                        enum FirewallRulePolicy {
                           "deny",
                           "allow",
                        }
                        interface FirewallAddressRule {
                           address: string;
                           prefix: number;
                           policy: cisService.applmgmt.techpreview.networking.firewall.addr.inbound.FirewallRulePolicy;
                           interface_name: string;
                        }
                        interface DeleteFirewallRule {
                           position: number;
                           all: boolean;
                        }
                     }
                  }
               }
            }
            interface services {
               status: services.status;
               stop(name: string, timeout: number): Promise<void>;
               restart(name: string, timeout: number): Promise<void>;
               control(args: Array<string>, name: string, timeout: number): Promise<void>;
               list(): Promise<Array<cisService.applmgmt.techpreview.services.ServiceInfo>>;
            }
            namespace services {
               interface status {
                  get(name: string, timeout: number): Promise<cisService.applmgmt.techpreview.services.status.ServiceStatus>;
               }
               namespace status {
                  enum ServiceStatus {
                     "down",
                     "up",
                  }
               }
               enum ServiceOps {
                  "control",
                  "status",
                  "stop",
                  "restart",
               }
               interface ServiceInfo {
                  name: string;
                  description: string;
                  operations: Array<cisService.applmgmt.techpreview.services.ServiceOps>;
               }
            }
            interface ntp {
               server: ntp.server;
               test(servers: Array<string>): Promise<cisService.applmgmt.techpreview.ntp.TestStatusInfo>;
               get(): Promise<cisService.applmgmt.techpreview.ntp.NTPConfig>;
            }
            namespace ntp {
               interface server {
                  add(servers: Array<string>): Promise<void>;
                  set(servers: Array<string>): Promise<void>;
                  delete(servers: Array<string>): Promise<void>;
               }
               namespace server {
               }
               enum NTPStatus {
                  "Down",
                  "Unknown",
                  "Up",
               }
               enum TestStatus {
                  "orange",
                  "green",
                  "red",
               }
               enum MessageStatus {
                  "failure",
                  "success",
               }
               interface TestStatusInfo {
                  status: cisService.applmgmt.techpreview.ntp.TestStatus;
                  messages: Array<cisService.applmgmt.techpreview.ntp.Message>;
               }
               interface Message {
                  message: string;
                  result: cisService.applmgmt.techpreview.ntp.MessageStatus;
               }
               interface NTPConfig {
                  status: cisService.applmgmt.techpreview.ntp.NTPStatus;
                  servers: Array<string>;
               }
            }
            interface shutdown {
               cancel(): Promise<void>;
               reboot(config: cisService.applmgmt.techpreview.shutdown.ShutdownConfig): Promise<void>;
               poweroff(config: cisService.applmgmt.techpreview.shutdown.ShutdownConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.techpreview.shutdown.ShutdownGetConfig>;
            }
            namespace shutdown {
               interface ShutdownConfig {
                  delay: number;
                  reason: string;
               }
               interface ShutdownGetConfig {
                  shutdown_time: string;
                  action: string;
                  reason: string;
               }
            }
            interface timesync {
               set(config: cisService.applmgmt.techpreview.timesync.TimeSyncConfig): Promise<void>;
               get(): Promise<cisService.applmgmt.techpreview.timesync.TimeSyncConfig>;
            }
            namespace timesync {
               enum TimeSyncMode {
                  "Disabled",
                  "NTP",
                  "host",
               }
               interface TimeSyncConfig {
                  mode: cisService.applmgmt.techpreview.timesync.TimeSyncMode;
               }
            }
         }
         interface health {
            load: health.load;
            system: health.system;
            databasestorage: health.databasestorage;
            swap: health.swap;
            applmgmt: health.applmgmt;
            softwarepackages: health.softwarepackages;
            storage: health.storage;
            mem: health.mem;
         }
         namespace health {
            interface load {
               get(): Promise<cisService.applmgmt.health.load.HealthLevel>;
            }
            namespace load {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface system {
               lastcheck(): Promise<Date>;
               get(): Promise<cisService.applmgmt.health.system.HealthLevel>;
            }
            namespace system {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface databasestorage {
               get(): Promise<cisService.applmgmt.health.databasestorage.HealthLevel>;
            }
            namespace databasestorage {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface swap {
               get(): Promise<cisService.applmgmt.health.swap.HealthLevel>;
            }
            namespace swap {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface applmgmt {
               get(): Promise<string>;
            }
            namespace applmgmt {
            }
            interface softwarepackages {
               get(): Promise<cisService.applmgmt.health.softwarepackages.HealthLevel>;
            }
            namespace softwarepackages {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface storage {
               get(): Promise<cisService.applmgmt.health.storage.HealthLevel>;
            }
            namespace storage {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
            interface mem {
               get(): Promise<cisService.applmgmt.health.mem.HealthLevel>;
            }
            namespace mem {
               enum HealthLevel {
                  "orange",
                  "gray",
                  "green",
                  "red",
                  "yellow",
               }
            }
         }
         interface networking {
            interfaces: networking.interfaces;
            dns: networking.dns;
         }
         namespace networking {
            interface interfaces {
               get(interfaceName: string): Promise<cisService.applmgmt.networking.interfaces.InterfaceInfo>;
               list(): Promise<Array<cisService.applmgmt.networking.interfaces.InterfaceInfo>>;
            }
            namespace interfaces {
               enum InterfaceStatus {
                  "down",
                  "up",
               }
               interface InterfaceInfo {
                  name: string;
                  status: cisService.applmgmt.networking.interfaces.InterfaceStatus;
                  mac: string;
               }
            }
            interface dns {
               hostname: dns.hostname;
               domains: dns.domains;
               servers: dns.servers;
            }
            namespace dns {
               interface hostname {
                  set(name: string): Promise<void>;
                  test(name: string): Promise<cisService.applmgmt.networking.dns.hostname.TestStatusInfo>;
                  get(): Promise<string>;
               }
               namespace hostname {
                  enum MessageStatus {
                     "failure",
                     "success",
                  }
                  enum TestStatus {
                     "orange",
                     "green",
                     "red",
                  }
                  interface Message {
                     message: string;
                     result: cisService.applmgmt.networking.dns.hostname.MessageStatus;
                  }
                  interface TestStatusInfo {
                     status: cisService.applmgmt.networking.dns.hostname.TestStatus;
                     messages: Array<cisService.applmgmt.networking.dns.hostname.Message>;
                  }
               }
               interface domains {
                  add(domain: string): Promise<void>;
                  set(domains: Array<string>): Promise<void>;
                  list(): Promise<Array<string>>;
               }
               namespace domains {
               }
               interface servers {
                  add(server: string): Promise<void>;
                  set(config: cisService.applmgmt.networking.dns.servers.DNSServerConfig): Promise<void>;
                  test(servers: Array<string>): Promise<cisService.applmgmt.networking.dns.servers.TestStatusInfo>;
                  get(): Promise<cisService.applmgmt.networking.dns.servers.DNSServerConfig>;
               }
               namespace servers {
                  enum DNSServerMode {
                     "dhcp",
                     "is_static",
                  }
                  enum TestStatus {
                     "orange",
                     "green",
                     "red",
                  }
                  enum MessageStatus {
                     "failure",
                     "success",
                  }
                  interface DNSServerConfig {
                     mode: cisService.applmgmt.networking.dns.servers.DNSServerMode;
                     servers: Array<string>;
                  }
                  interface Message {
                     message: string;
                     result: cisService.applmgmt.networking.dns.servers.MessageStatus;
                  }
                  interface TestStatusInfo {
                     status: cisService.applmgmt.networking.dns.servers.TestStatus;
                     messages: Array<cisService.applmgmt.networking.dns.servers.Message>;
                  }
               }
            }
         }
         interface monitoring {
            query(item: cisService.applmgmt.monitoring.MonitoredItemDataRequest): Promise<Array<cisService.applmgmt.monitoring.MonitoredItemData>>;
            get(statId: string): Promise<cisService.applmgmt.monitoring.MonitoredItem>;
            list(): Promise<Array<cisService.applmgmt.monitoring.MonitoredItem>>;
         }
         namespace monitoring {
            enum IntervalType {
               "MINUTES30",
               "HOURS2",
               "MINUTES5",
               "DAY1",
               "HOURS6",
            }
            enum FunctionType {
               "COUNT",
               "MAX",
               "AVG",
               "MIN",
            }
            interface MonitoredItemDataRequest {
               names: Array<string>;
               interval: cisService.applmgmt.monitoring.IntervalType;
               function: cisService.applmgmt.monitoring.FunctionType;
               start_time: Date;
               end_time: Date;
            }
            interface MonitoredItem {
               id: string;
               name: string;
               units: string;
               category: string;
               instance: string;
               description: string;
            }
            interface MonitoredItemData {
               name: string;
               interval: cisService.applmgmt.monitoring.IntervalType;
               function: cisService.applmgmt.monitoring.FunctionType;
               start_time: Date;
               end_time: Date;
               data: Array<string>;
            }
         }
         interface system {
            storage: system.storage;
            version: system.version;
            uptime: system.uptime;
            time: system.time;
         }
         namespace system {
            interface storage {
               resize(): Promise<void>;
               list(): Promise<Array<cisService.applmgmt.system.storage.StorageMapping>>;
            }
            namespace storage {
               interface StorageMapping {
                  disk: string;
                  partition: string;
               }
            }
            interface version {
               get(): Promise<cisService.applmgmt.system.version.VersionStruct>;
            }
            namespace version {
               interface VersionStruct {
                  version: string;
                  product: string;
                  build: string;
                  type: string;
                  summary: string;
                  releasedate: string;
                  install_time: string;
               }
            }
            interface uptime {
               get(): Promise<number>;
            }
            namespace uptime {
            }
            interface time {
               get(): Promise<cisService.applmgmt.system.time.SystemTimeStruct>;
            }
            namespace time {
               interface SystemTimeStruct {
                  seconds_since_epoch: number;
                  date: string;
                  time: string;
                  timezone: string;
               }
            }
         }
         interface recovery {
            restore: recovery.restore;
            backup: recovery.backup;
         }
         namespace recovery {
            interface restore {
               validate(piece: cisService.applmgmt.recovery.restore.RestoreRequest): Promise<cisService.applmgmt.recovery.restore.Metadata>;
               job: restore.job;
            }
            namespace restore {
               interface job {
                  cancel(): Promise<cisService.applmgmt.recovery.restore.job.ReturnResult>;
                  get(): Promise<cisService.applmgmt.recovery.restore.job.RestoreJobStatus>;
                  create(piece: cisService.applmgmt.recovery.restore.job.RestoreRequest): Promise<cisService.applmgmt.recovery.restore.job.RestoreJobStatus>;
               }
               namespace job {
                  enum LocationType {
                     "FTPS",
                     "HTTP",
                     "SCP",
                     "HTTPS",
                     "FTP",
                  }
                  enum ReturnStatus {
                     "FAIL",
                     "WARNING",
                     "OK",
                  }
                  enum BackupRestoreProcessState {
                     "FAILED",
                     "INPROGRESS",
                     "NONE",
                     "SUCCEEDED",
                  }
                  interface RestoreRequest {
                     backup_password?: string;
                     location_type: cisService.applmgmt.recovery.restore.job.LocationType;
                     location: string;
                     location_user?: string;
                     location_password?: string;
                  }
                  interface LocalizableMessage {
                     id: string;
                     defaultMessage: string;
                     args: Array<string>;
                  }
                  interface ReturnResult {
                     status: cisService.applmgmt.recovery.restore.job.ReturnStatus;
                     messages: Array<cisService.applmgmt.recovery.restore.job.LocalizableMessage>;
                  }
                  interface RestoreJobStatus {
                     state: cisService.applmgmt.recovery.restore.job.BackupRestoreProcessState;
                     messages: Array<cisService.applmgmt.recovery.restore.job.LocalizableMessage>;
                     progress: number;
                  }
               }
               enum LocationType {
                  "FTPS",
                  "HTTP",
                  "SCP",
                  "HTTPS",
                  "FTP",
               }
               interface RestoreRequest {
                  backup_password?: string;
                  location_type: cisService.applmgmt.recovery.restore.LocationType;
                  location: string;
                  location_user?: string;
                  location_password?: string;
               }
               interface Metadata {
                  timestamp: Date;
                  parts: Array<string>;
                  version: string;
                  boxname: string;
                  comment: string;
                  applicable: boolean;
                  messages: Array<cisService.applmgmt.recovery.restore.LocalizableMessage>;
               }
               interface LocalizableMessage {
                  id: string;
                  defaultMessage: string;
                  args: Array<string>;
               }
            }
            interface backup {
               validate(piece: cisService.applmgmt.recovery.backup.BackupRequest): Promise<cisService.applmgmt.recovery.backup.ReturnResult>;
               parts: backup.parts;
               job: backup.job;
            }
            namespace backup {
               interface parts {
                  get(id: string): Promise<number>;
                  list(): Promise<Array<cisService.applmgmt.recovery.backup.parts.Part>>;
               }
               namespace parts {
                  interface Part {
                     id: string;
                     name: cisService.applmgmt.recovery.backup.parts.LocalizableMessage;
                     description: cisService.applmgmt.recovery.backup.parts.LocalizableMessage;
                     selected_by_default: boolean;
                     optional: boolean;
                  }
                  interface LocalizableMessage {
                     id: string;
                     defaultMessage: string;
                     args: Array<string>;
                  }
               }
               interface job {
                  cancel(id: string): Promise<cisService.applmgmt.recovery.backup.job.ReturnResult>;
                  get(id: string): Promise<cisService.applmgmt.recovery.backup.job.BackupJobStatus>;
                  create(piece: cisService.applmgmt.recovery.backup.job.BackupRequest): Promise<cisService.applmgmt.recovery.backup.job.BackupJobStatus>;
                  list(): Promise<Array<string>>;
               }
               namespace job {
                  enum ReturnStatus {
                     "FAIL",
                     "WARNING",
                     "OK",
                  }
                  enum BackupRestoreProcessState {
                     "FAILED",
                     "INPROGRESS",
                     "NONE",
                     "SUCCEEDED",
                  }
                  enum LocationType {
                     "FTPS",
                     "HTTP",
                     "SCP",
                     "HTTPS",
                     "FTP",
                  }
                  interface ReturnResult {
                     status: cisService.applmgmt.recovery.backup.job.ReturnStatus;
                     messages: Array<cisService.applmgmt.recovery.backup.job.LocalizableMessage>;
                  }
                  interface LocalizableMessage {
                     id: string;
                     defaultMessage: string;
                     args: Array<string>;
                  }
                  interface BackupRequest {
                     parts: Array<string>;
                     backup_password?: string;
                     location_type: cisService.applmgmt.recovery.backup.job.LocationType;
                     location: string;
                     location_user?: string;
                     location_password?: string;
                     comment?: string;
                  }
                  interface BackupJobStatus {
                     id: string;
                     state: cisService.applmgmt.recovery.backup.job.BackupRestoreProcessState;
                     messages: Array<cisService.applmgmt.recovery.backup.job.LocalizableMessage>;
                     progress: number;
                     start_time: Date;
                     end_time?: Date;
                  }
               }
               enum LocationType {
                  "FTPS",
                  "HTTP",
                  "SCP",
                  "HTTPS",
                  "FTP",
               }
               enum ReturnStatus {
                  "FAIL",
                  "WARNING",
                  "OK",
               }
               interface LocalizableMessage {
                  id: string;
                  defaultMessage: string;
                  args: Array<string>;
               }
               interface ReturnResult {
                  status: cisService.applmgmt.recovery.backup.ReturnStatus;
                  messages: Array<cisService.applmgmt.recovery.backup.LocalizableMessage>;
               }
               interface BackupRequest {
                  parts: Array<string>;
                  backup_password?: string;
                  location_type: cisService.applmgmt.recovery.backup.LocationType;
                  location: string;
                  location_user?: string;
                  location_password?: string;
                  comment?: string;
               }
            }
         }
      }
      interface cis {
         session: cis.session;
      }
      namespace cis {
         interface session {
            get(): Promise<cisService.cis.session.Info>;
            create(): Promise<string>;
            delete(): Promise<void>;
         }
         namespace session {
            interface Info {
               user: string;
               created_time: Date;
               last_accessed_time: Date;
            }
         }
      }
      interface tagging {
         sessions: tagging.sessions;
         tagAssociation: tagging.tagAssociation;
         category: tagging.category;
         tag: tagging.tag;
         batch: tagging.batch;
      }
      namespace tagging {
         interface sessions {
            sessionManager: sessions.sessionManager;
         }
         namespace sessions {
            interface sessionManager {
               logout(): Promise<void>;
               keepAlive(): Promise<void>;
               login(): Promise<string>;
            }
            namespace sessionManager {
            }
         }
         interface tagAssociation {
            listAttachedTagsOnObjects(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<cisService.tagging.tagAssociation.ObjectToTags>>;
            listAttachableTags(objectId: cisService.vapi.std.DynamicID): Promise<Array<string>>;
            detach(tagId: string, objectId: cisService.vapi.std.DynamicID): Promise<void>;
            listAttachedObjects(tagId: string): Promise<Array<cisService.vapi.std.DynamicID>>;
            attach(tagId: string, objectId: cisService.vapi.std.DynamicID): Promise<void>;
            listAttachedObjectsOnTags(tagIds: Array<string>): Promise<Array<cisService.tagging.tagAssociation.TagToObjects>>;
            attachMultipleTagsToObject(objectId: cisService.vapi.std.DynamicID, tagIds: Array<string>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            attachTagToMultipleObjects(tagId: string, objectIds: Array<cisService.vapi.std.DynamicID>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            detachTagFromMultipleObjects(tagId: string, objectIds: Array<cisService.vapi.std.DynamicID>): Promise<cisService.tagging.tagAssociation.BatchResult>;
            listAttachedTags(objectId: cisService.vapi.std.DynamicID): Promise<Array<string>>;
            detachMultipleTagsFromObject(objectId: cisService.vapi.std.DynamicID, tagIds: Array<string>): Promise<cisService.tagging.tagAssociation.BatchResult>;
         }
         namespace tagAssociation {
            interface BatchResult {
               success: boolean;
               error_messages: Array<cisService.vapi.std.LocalizableMessage>;
            }
            interface TagToObjects {
               tag_id: string;
               object_ids: Array<cisService.vapi.std.DynamicID>;
            }
            interface ObjectToTags {
               object_id: cisService.vapi.std.DynamicID;
               tag_ids: Array<string>;
            }
         }
         interface category {
            addToUsedBy(categoryId: string, usedByEntity: string): Promise<void>;
            listUsedCategories(usedByEntity: string): Promise<Array<string>>;
            get(categoryId: string): Promise<cisService.tagging.CategoryModel>;
            revokePropagatingPermissions(categoryId: string): Promise<void>;
            create(createSpec: cisService.tagging.category.CreateSpec): Promise<string>;
            update(categoryId: string, updateSpec: cisService.tagging.category.UpdateSpec): Promise<void>;
            list(): Promise<Array<string>>;
            delete(categoryId: string): Promise<void>;
            removeFromUsedBy(categoryId: string, usedByEntity: string): Promise<void>;
         }
         namespace category {
            interface UpdateSpec {
               name?: string;
               description?: string;
               cardinality?: cisService.tagging.CategoryModel.Cardinality;
               associable_types?: Array<string>;
            }
            interface CreateSpec {
               name: string;
               description: string;
               cardinality: cisService.tagging.CategoryModel.Cardinality;
               associable_types: Array<string>;
            }
         }
         interface tag {
            addToUsedBy(tagId: string, usedByEntity: string): Promise<void>;
            get(tagId: string): Promise<cisService.tagging.TagModel>;
            revokePropagatingPermissions(tagId: string): Promise<void>;
            create(createSpec: cisService.tagging.tag.CreateSpec): Promise<string>;
            update(tagId: string, updateSpec: cisService.tagging.tag.UpdateSpec): Promise<void>;
            list(): Promise<Array<string>>;
            listUsedTags(usedByEntity: string): Promise<Array<string>>;
            delete(tagId: string): Promise<void>;
            removeFromUsedBy(tagId: string, usedByEntity: string): Promise<void>;
            listTagsForCategory(categoryId: string): Promise<Array<string>>;
         }
         namespace tag {
            interface UpdateSpec {
               name?: string;
               description?: string;
            }
            interface CreateSpec {
               name: string;
               description: string;
               category_id: string;
            }
         }
         interface batch {
            getAllCategories(): Promise<Array<cisService.tagging.CategoryModel>>;
            listTagsForCategories(categoryIds: Array<string>): Promise<Array<string>>;
            getTags(tagIds: Array<string>): Promise<Array<cisService.tagging.TagModel>>;
            listAttachedTagsOnObjects(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<cisService.tagging.batch.ObjectToTags>>;
            getCategories(categoryIds: Array<string>): Promise<Array<cisService.tagging.CategoryModel>>;
            listAttachedObjects(tagIds: Array<string>): Promise<Array<cisService.vapi.std.DynamicID>>;
            findTagsByName(tagName: string): Promise<Array<string>>;
            listAttachedObjectsOnTags(tagIds: Array<string>): Promise<Array<cisService.tagging.batch.TagToObjects>>;
            listAllAttachedObjectsOnTags(): Promise<Array<cisService.tagging.batch.TagToObjects>>;
            listAttachedTags(objectIds: Array<cisService.vapi.std.DynamicID>): Promise<Array<string>>;
            getAllTags(): Promise<Array<cisService.tagging.TagModel>>;
         }
         namespace batch {
            interface TagToObjects {
               tag_id: string;
               object_ids: Array<cisService.vapi.std.DynamicID>;
            }
            interface ObjectToTags {
               object_id: cisService.vapi.std.DynamicID;
               tag_ids: Array<string>;
            }
         }
         interface CategoryModel {
            id: string;
            name: string;
            description: string;
            cardinality: cisService.tagging.CategoryModel.Cardinality;
            associable_types: Array<string>;
            used_by: Array<string>;
         }
         namespace CategoryModel {
            enum Cardinality {
               "SINGLE", "MULTIPLE"
            }
         }
         interface TagModel {
            id: string;
            category_id: string;
            name: string;
            description: string;
            used_by: Array<string>;
         }
      }
      interface content {
         library: content.library;
         localLibrary: content.localLibrary;
         configuration: content.configuration;
         subscribedLibrary: content.subscribedLibrary;
         type: content.type;
      }
      namespace content {
         interface library {
            find(spec: cisService.content.library.FindSpec): Promise<Array<string>>;
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            subscribedItem: library.subscribedItem;
            item: library.item;
            itemPath: library.itemPath;
         }
         namespace library {
            interface subscribedItem {
               sync(libraryItemId: string, forceSyncContent: boolean): Promise<void>;
               evict(libraryItemId: string): Promise<void>;
            }
            namespace subscribedItem {
            }
            interface item {
               find(spec: cisService.content.library.item.FindSpec): Promise<Array<string>>;
               get(libraryItemId: string): Promise<cisService.content.library.ItemModel>;
               create(clientToken: string, createSpec: cisService.content.library.ItemModel): Promise<string>;
               update(libraryItemId: string, updateSpec: cisService.content.library.ItemModel): Promise<void>;
               copy(clientToken: string, sourceLibraryItemId: string, destinationCreateSpec: cisService.content.library.ItemModel): Promise<string>;
               list(libraryId: string): Promise<Array<string>>;
               delete(libraryItemId: string): Promise<void>;
               tagging: item.tagging;
               updateSession: item.updateSession;
               downloadSession: item.downloadSession;
               file: item.file;
               storage: item.storage;
               downloadsession: item.downloadsession;
               updatesession: item.updatesession;
            }
            namespace item {
               interface tagging {
                  get(libraryItemId: string, key: string): Promise<string>;
                  create(libraryItemId: string, key: string, value: string): Promise<void>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.tagging.Info>>;
                  delete(libraryItemId: string, key: string): Promise<void>;
               }
               namespace tagging {
                  interface Info {
                     key: string;
                     value?: string;
                  }
               }
               interface updateSession {
                  cancel(updateSessionId: string): Promise<void>;
                  fail(updateSessionId: string, clientErrorMessage: string): Promise<void>;
                  get(updateSessionId: string): Promise<cisService.content.library.item.UpdateSessionModel>;
                  create(clientToken: string, createSpec: cisService.content.library.item.UpdateSessionModel): Promise<string>;
                  keepAlive(updateSessionId: string, clientProgress: number): Promise<void>;
                  list(libraryItemId: string): Promise<Array<string>>;
                  complete(updateSessionId: string): Promise<void>;
                  delete(updateSessionId: string): Promise<void>;
               }
               namespace updateSession {
               }
               interface downloadSession {
                  cancel(downloadSessionId: string): Promise<void>;
                  fail(downloadSessionId: string, clientErrorMessage: string): Promise<void>;
                  get(downloadSessionId: string): Promise<cisService.content.library.item.DownloadSessionModel>;
                  create(clientToken: string, createSpec: cisService.content.library.item.DownloadSessionModel): Promise<string>;
                  keepAlive(downloadSessionId: string, progress: number): Promise<void>;
                  list(libraryItemId: string): Promise<Array<string>>;
                  delete(downloadSessionId: string): Promise<void>;
               }
               namespace downloadSession {
               }
               interface file {
                  get(libraryItemId: string, name: string): Promise<cisService.content.library.item.file.Info>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.file.Info>>;
               }
               namespace file {
                  enum ChecksumAlgorithm {
                     "SHA1",
                     "MD5",
                  }
                  interface Info {
                     checksum_info?: cisService.content.library.item.file.ChecksumInfo;
                     name: string;
                     size: number;
                     cached: boolean;
                     version: string;
                  }
                  interface ChecksumInfo {
                     algorithm?: cisService.content.library.item.file.ChecksumAlgorithm;
                     checksum: string;
                  }
               }
               interface storage {
                  get(libraryItemId: string, fileName: string): Promise<Array<cisService.content.library.item.storage.Info>>;
                  list(libraryItemId: string): Promise<Array<cisService.content.library.item.storage.Info>>;
               }
               namespace storage {
                  interface Info {
                     storage_backing: cisService.content.library.StorageBacking;
                     storage_uris: Array<string>;
                     checksum_info?: cisService.content.library.item.file.ChecksumInfo;
                     name: string;
                     size: number;
                     cached: boolean;
                     version: string;
                  }
               }
               interface downloadsession {
                  file: downloadsession.file;
               }
               namespace downloadsession {
                  interface file {
                     prepare(downloadSessionId: string, fileName: string, endpointType: cisService.content.library.item.downloadsession.file.EndpointType): Promise<cisService.content.library.item.downloadsession.file.Info>;
                     get(downloadSessionId: string, fileName: string): Promise<cisService.content.library.item.downloadsession.file.Info>;
                     list(downloadSessionId: string): Promise<Array<cisService.content.library.item.downloadsession.file.Info>>;
                  }
                  namespace file {
                     enum PrepareStatus {
                        "UNPREPARED",
                        "PREPARE_REQUESTED",
                        "PREPARING",
                        "PREPARED",
                        "ERROR",
                     }
                     enum EndpointType {
                        "HTTPS",
                        "DIRECT",
                     }
                     interface Info {
                        name: string;
                        size?: number;
                        bytes_transferred: number;
                        status: cisService.content.library.item.downloadsession.file.PrepareStatus;
                        download_endpoint?: cisService.content.library.item.TransferEndpoint;
                        checksum_info?: cisService.content.library.item.file.ChecksumInfo;
                        error_message?: cisService.vapi.std.LocalizableMessage;
                     }
                  }
               }
               interface updatesession {
                  file: updatesession.file;
               }
               namespace updatesession {
                  interface file {
                     add(updateSessionId: string, fileSpec: cisService.content.library.item.updatesession.file.AddSpec): Promise<cisService.content.library.item.updatesession.file.Info>;
                     get(updateSessionId: string, fileName: string): Promise<cisService.content.library.item.updatesession.file.Info>;
                     list(updateSessionId: string): Promise<Array<cisService.content.library.item.updatesession.file.Info>>;
                     remove(updateSessionId: string, fileName: string): Promise<void>;
                     validate(updateSessionId: string): Promise<cisService.content.library.item.updatesession.file.ValidationResult>;
                  }
                  namespace file {
                     enum SourceType {
                        "NONE",
                        "PUSH",
                        "PULL",
                     }
                     interface Info {
                        name: string;
                        sourceType: cisService.content.library.item.updatesession.file.SourceType;
                        size?: number;
                        checksumInfo?: cisService.content.library.item.file.ChecksumInfo;
                        sourceEndpoint?: cisService.content.library.item.TransferEndpoint;
                        uploadEndpoint?: cisService.content.library.item.TransferEndpoint;
                        bytesTransferred: number;
                        status: cisService.content.library.item.TransferStatus;
                        errorMessage?: cisService.vapi.std.LocalizableMessage;
                     }
                     interface ValidationResult {
                        hasErrors: boolean;
                        missingFiles: Array<string>;
                        invalidFiles: Array<cisService.content.library.item.updatesession.file.ValidationError>;
                     }
                     interface AddSpec {
                        name: string;
                        sourceType: string;// NONE, PUSH, PULL cisService.content.library.item.updatesession.file.SourceType;
                        sourceEndpoint?: cisService.content.library.item.TransferEndpoint;
                        size?: number;
                        checksumInfo?: cisService.content.library.item.file.ChecksumInfo;
                     }
                     interface ValidationError {
                        name: string;
                        errorMessage: cisService.vapi.std.LocalizableMessage;
                     }
                  }
               }
               interface FindSpec {
                  name?: string;
                  library_id?: string;
                  source_id?: string;
                  type?: string;
                  cached?: boolean;
               }
               enum TransferStatus {
                  "WAITING_FOR_TRANSFER",
                  "TRANSFERRING",
                  "READY",
                  "VALIDATING",
                  "ERROR",
               }
               interface UpdateSessionModel {
                  id?: string;
                  libraryItemId?: string;
                  libraryItemContentVersion?: string;
                  errorMessage?: cisService.vapi.std.LocalizableMessage;
                  clientProgress?: number;
                  state?: cisService.content.library.item.UpdateSessionModel.State;
                  expirationTime?: Date;
               }
               namespace UpdateSessionModel {
                  enum State {
                     "ACTIVE", "DONE", "ERROR", "CANCELED"
                  }
               }
               interface DownloadSessionModel {
                  id?: string;
                  library_item_id?: string;
                  library_item_content_version?: string;
                  error_message?: cisService.vapi.std.LocalizableMessage;
                  client_progress?: number;
                  state?: cisService.content.library.item.DownloadSessionModel.State;
                  expiration_time?: Date;
               }
               namespace DownloadSessionModel {
                  enum State {
                     "ACTIVE", "CANCELED", "ERROR"
                  }
               }
               interface TransferEndpoint {
                  uri: string;
                  ssl_certificate_thumbprint?: string;
               }
            }
            interface itemPath {
               getByDatastorePath(datastorePath: string): Promise<cisService.content.library.ItemModel>;
            }
            namespace itemPath {
            }
            interface FindSpec {
               name?: string;
               type?: cisService.content.LibraryModel.LibraryType;
            }
            interface SubscriptionInfo {
               authentication_method?: cisService.content.library.SubscriptionInfo.AuthenticationMethod;
               automatic_sync_enabled?: boolean;
               on_demand?: boolean;
               password?: string;
               ssl_thumbprint?: string;
               subscription_url?: string;
               user_name?: string;
            }
            namespace SubscriptionInfo {
               enum AuthenticationMethod {
                  "BASIC", "NONE"
               }
            }
            interface ItemModel {
               id?: string;
               libraryId?: string;
               contentVersion?: string;
               creationTime?: Date;
               description?: string;
               lastModifiedTime?: Date;
               lastSyncTime?: Date;
               metadataVersion?: string;
               name?: string;
               cached?: boolean;
               size?: number;
               type?: string;
               version?: string;
               sourceId?: string;
            }
            interface PublishInfo {
               authentication_method?: string;
               published?: boolean;
               publish_url?: string;
               user_name?: string;
               password?: string;
               persist_json_enabled?: boolean;
            }
            namespace PublishInfo {
               enum AuthenticationMethod {
                  "BASIC", "NONE"
               }
            }
            interface OptimizationInfo {
               optimize_remote_publishing?: boolean;
            }
            interface StorageBacking {
               type?: string;
               datastoreId?: string;
               storage_uri?: string;
            }
            namespace StorageBacking {
               enum Type {
                  "DATASTORE", "OTHER"
               }
            }
         }
         interface localLibrary {
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            create(clientToken: string, createSpec: cisService.content.LibraryModel): Promise<string>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            delete(libraryId: string): Promise<void>;
         }
         namespace localLibrary {
         }
         interface configuration {
            get(): Promise<cisService.content.ConfigurationModel>;
            update(model: cisService.content.ConfigurationModel): Promise<void>;
         }
         namespace configuration {
         }
         interface subscribedLibrary {
            get(libraryId: string): Promise<cisService.content.LibraryModel>;
            create(clientToken: string, createSpec: cisService.content.LibraryModel): Promise<string>;
            update(libraryId: string, updateSpec: cisService.content.LibraryModel): Promise<void>;
            list(): Promise<Array<string>>;
            delete(libraryId: string): Promise<void>;
            sync(libraryId: string): Promise<void>;
            evict(libraryId: string): Promise<void>;
            probe(subscriptionInfo: cisService.content.library.SubscriptionInfo): Promise<cisService.content.subscribedLibrary.ProbeResult>;
         }
         namespace subscribedLibrary {
            interface ProbeResult {
               status: cisService.content.subscribedLibrary.ProbeResult.Status;
               ssl_thumbprint?: string;
               error_messages: Array<cisService.vapi.std.LocalizableMessage>;
            }
            namespace ProbeResult {
               enum Status {
                  "SUCCESS", "INVALID_URL", "TIMED_OUT", "HOST_NOT_FOUND", "RESOURCE_NOT_FOUND", "INVALID_CREDENTIALS", "CERTIFICATE_ERROR", "UNKNOWN_ERROR"
               }
            }
         }
         interface type {
            list(): Promise<Array<cisService.content.type.Info>>;
            ovf: type.ovf;
         }
         namespace type {
            interface Info {
               description: string;
               name: string;
               type: string;
               vendor: string;
               version: string;
            }
            interface ovf {
               policy: ovf.policy;
            }
            namespace ovf {
               interface OvfTemplate {
                  id: string;
                  vm_count: number;
                  version: string;
                  library_id_parent: string;
                  is_vapp_template: boolean;
                  vm_template?: cisService.content.type.ovf.VmTemplate;
                  vapp_template?: cisService.content.type.ovf.VAppTemplate;
                  networks: Array<cisService.content.type.ovf.Network>;
                  storage_policy_groups?: Array<cisService.content.type.ovf.policy.StoragePolicyGroup>;
               }
               interface VmTemplate {
                  vm_name: string;
                  os_type?: string;
                  os_description?: string;
                  cpu?: cisService.content.type.ovf.Cpu;
                  memory?: cisService.content.type.ovf.Memory;
                  disks?: Array<cisService.content.type.ovf.Disk>;
                  nics?: Array<cisService.content.type.ovf.Nic>;
                  video_cards?: Array<cisService.content.type.ovf.VideoCard>;
                  drives?: Array<cisService.content.type.ovf.Drive>;
                  floppies?: Array<cisService.content.type.ovf.Floppy>;
                  disk_controllers?: Array<cisService.content.type.ovf.DiskController>;
                  usb_controllers?: Array<cisService.content.type.ovf.USBController>;
                  storage_policies?: Array<cisService.content.type.ovf.policy.StoragePolicy>;
               }
               interface Disk {
                  name: string;
                  disk_capacity: number;
                  storage_policy?: cisService.content.type.ovf.policy.StoragePolicy;
               }
               interface Network {
                  name: string;
                  description?: string;
               }
               interface VideoCard {
                  render_type?: string;
                  video_ram_size?: number;
                  graphics_memory_size?: number;
                  enable3d?: boolean;
                  num_displays?: number;
                  use_auto_detect?: boolean;
               }
               interface DiskController {
                  name: string;
                  type?: string;
                  sub_type?: string;
               }
               interface Cpu {
                  num_cpus: number;
                  reservation?: number;
                  limit?: number;
                  shares?: number;
               }
               interface Nic {
                  name: string;
                  network_name?: string;
                  mac_address?: string;
                  start_connected?: boolean;
               }
               interface Floppy {
                  name: string;
                  connected?: boolean;
                  type?: string;
               }
               interface Memory {
                  size: number;
                  reservation?: number;
                  limit?: number;
                  shares?: number;
               }
               interface Drive {
                  name: string;
                  type?: string;
                  sub_type?: string;
               }
               interface VAppTemplate {
                  vapp_name?: string;
                  vm_templates?: Array<cisService.content.type.ovf.VmTemplate>;
                  storage_policies?: Array<cisService.content.type.ovf.policy.StoragePolicy>;
               }
               interface USBController {
                  type?: string;
                  auto_connect?: boolean;
                  ehci_pci_slot_number?: number;
                  pci_slot_number?: number;
               }
               interface policy {
               }
               namespace policy {
                  interface StoragePolicy {
                     group_id: string;
                  }
                  interface StoragePolicyGroup {
                     id: string;
                     name: string;
                     description?: string;
                  }
               }
            }
         }
         interface ConfigurationModel {
            automatic_sync_enabled?: boolean;
            automatic_sync_start_hour?: number;
            automatic_sync_stop_hour?: number;
            maximum_concurrent_item_syncs?: number;
         }
         interface LibraryModel {
            id?: string;
            creation_time?: Date;
            description?: string;
            last_modified_time?: Date;
            last_sync_time?: Date;
            name?: string;
            storageBackings?: Array<cisService.content.library.StorageBacking>;
            type?: string;
            optimization_info?: cisService.content.library.OptimizationInfo;
            version?: string;
            publish_info?: cisService.content.library.PublishInfo;
            subscription_info?: cisService.content.library.SubscriptionInfo;
            server_guid?: string;
         }
         namespace LibraryModel {
            enum LibraryType {
               "LOCAL", "SUBSCRIBED"
            }
         }
      }
      interface vapi {
         metadata: vapi.metadata;
         std: vapi.std;
      }
      namespace vapi {
         interface metadata {
            metamodel: metadata.metamodel;
            cli: metadata.cli;
            authentication: metadata.authentication;
            privilege: metadata.privilege;
         }
         namespace metadata {
            interface metamodel {
               service: metamodel.service;
               package: metamodel.package;
               structure: metamodel.structure;
               enumeration: metamodel.enumeration;
               component: metamodel.component;
               resource: metamodel.resource;
               source: metamodel.source;
            }
            namespace metamodel {
               interface service {
                  operation: service.operation;
                  hidden: service.hidden;
                  get(serviceId: string): Promise<cisService.vapi.metadata.metamodel.ServiceInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace service {
                  interface operation {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.metamodel.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
                  namespace operation {
                  }
                  interface hidden {
                     list(): Promise<Array<string>>;
                  }
                  namespace hidden {
                  }
               }
               interface package {
                  get(packageId: string): Promise<cisService.vapi.metadata.metamodel.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace package {
               }
               interface structure {
                  get(structureId: string): Promise<cisService.vapi.metadata.metamodel.StructureInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace structure {
               }
               interface enumeration {
                  get(enumerationId: string): Promise<cisService.vapi.metadata.metamodel.EnumerationInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace enumeration {
               }
               interface component {
                  get(componentId: string): Promise<cisService.vapi.metadata.metamodel.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               namespace component {
               }
               interface resource {
                  list(): Promise<Array<string>>;
                  model: resource.model;
               }
               namespace resource {
                  interface model {
                     list(resourceId: string): Promise<Array<string>>;
                  }
                  namespace model {
                  }
               }
               interface source {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.metamodel.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.metamodel.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
               }
               namespace source {
                  interface CreateSpec {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
                  interface Info {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
               }
               interface EnumerationInfo {
                  name: string;
                  values: Array<cisService.vapi.metadata.metamodel.EnumerationValueInfo>;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface EnumerationValueInfo {
                  value: string;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface ComponentInfo {
                  name: string;
                  packages: { [K: string]: cisService.vapi.metadata.metamodel.PackageInfo };
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface ComponentData {
                  info: cisService.vapi.metadata.metamodel.ComponentInfo;
                  fingerprint: string;
               }
               interface GenericInstantiation {
                  generic_type: cisService.vapi.metadata.metamodel.GenericInstantiation.GenericType;
                  element_type?: cisService.vapi.metadata.metamodel.Type;
                  map_key_type?: cisService.vapi.metadata.metamodel.Type;
                  map_value_type?: cisService.vapi.metadata.metamodel.Type;
               }
               namespace GenericInstantiation {
                  enum GenericType {
                     "LIST", "MAP", "OPTIONAL", "SET"
                  }
               }
               interface ServiceInfo {
                  name: string;
                  operations: { [K: string]: cisService.vapi.metadata.metamodel.OperationInfo };
                  structures: { [K: string]: cisService.vapi.metadata.metamodel.StructureInfo };
                  enumerations: { [K: string]: cisService.vapi.metadata.metamodel.EnumerationInfo };
                  constants: { [K: string]: cisService.vapi.metadata.metamodel.ConstantInfo };
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface UserDefinedType {
                  resource_type: string;
                  resource_id: string;
               }
               interface ConstantInfo {
                  type: cisService.vapi.metadata.metamodel.Type;
                  value: cisService.vapi.metadata.metamodel.ConstantValue;
                  documentation: string;
               }
               interface PrimitiveValue {
                  type: cisService.vapi.metadata.metamodel.PrimitiveValue.Type;
                  boolean_value?: boolean;
                  double_value?: number;
                  long_value?: number;
                  string_value?: string;
               }
               namespace PrimitiveValue {
                  enum Type {
                     "BOOLEAN", "DOUBLE", "LONG", "STRING"
                  }
               }
               interface ConstantValue {
                  category: cisService.vapi.metadata.metamodel.ConstantValue.Category;
                  primitive_value?: cisService.vapi.metadata.metamodel.PrimitiveValue;
                  list_value?: Array<cisService.vapi.metadata.metamodel.PrimitiveValue>;
               }
               namespace ConstantValue {
                  enum Category {
                     "PRIMITIVE", "LIST"
                  }
               }
               interface OperationResultInfo {
                  type: cisService.vapi.metadata.metamodel.Type;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface ElementMap {
                  elements: { [K: string]: cisService.vapi.metadata.metamodel.ElementValue };
               }
               interface StructureInfo {
                  name: string;
                  type: cisService.vapi.metadata.metamodel.StructureInfo.Type;
                  enumerations: { [K: string]: cisService.vapi.metadata.metamodel.EnumerationInfo };
                  constants: { [K: string]: cisService.vapi.metadata.metamodel.ConstantInfo };
                  fields: Array<cisService.vapi.metadata.metamodel.FieldInfo>;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               namespace StructureInfo {
                  enum Type {
                     "STRUCTURE", "ERROR"
                  }
               }
               interface OperationInfo {
                  name: string;
                  params: Array<cisService.vapi.metadata.metamodel.FieldInfo>;
                  output: cisService.vapi.metadata.metamodel.OperationResultInfo;
                  errors: Array<cisService.vapi.metadata.metamodel.ErrorInfo>;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface Type {
                  category: cisService.vapi.metadata.metamodel.Type.Category;
                  builtin_type?: cisService.vapi.metadata.metamodel.Type.BuiltinType;
                  user_defined_type?: cisService.vapi.metadata.metamodel.UserDefinedType;
                  generic_instantiation?: cisService.vapi.metadata.metamodel.GenericInstantiation;
               }
               namespace Type {
                  enum BuiltinType {
                     "VOID", "BOOLEAN", "LONG", "DOUBLE", "STRING", "BINARY", "SECRET", "DATE_TIME", "ID", "URI", "ANY_ERROR", "DYNAMIC_STRUCTURE", "OPAQUE"
                  }
                  enum Category {
                     "BUILTIN", "USER_DEFINED", "GENERIC"
                  }
               }
               interface ErrorInfo {
                  structure_id: string;
                  documentation: string;
               }
               interface FieldInfo {
                  name: string;
                  type: cisService.vapi.metadata.metamodel.Type;
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
               interface ElementValue {
                  type: cisService.vapi.metadata.metamodel.ElementValue.Type;
                  long_value?: number;
                  string_value?: string;
                  list_value?: Array<string>;
                  structure_id?: string;
                  structure_ids?: Array<string>;
               }
               namespace ElementValue {
                  enum Type {
                     "LONG", "STRING", "STRING_LIST", "STRUCTURE_REFERENCE", "STRUCTURE_REFERENCE_LIST"
                  }
               }
               interface PackageInfo {
                  name: string;
                  structures: { [K: string]: cisService.vapi.metadata.metamodel.StructureInfo };
                  enumerations: { [K: string]: cisService.vapi.metadata.metamodel.EnumerationInfo };
                  services: { [K: string]: cisService.vapi.metadata.metamodel.ServiceInfo };
                  metadata: { [K: string]: cisService.vapi.metadata.metamodel.ElementMap };
                  documentation: string;
               }
            }
            interface cli {
               source: cli.source;
               command: cli.command;
               namespace: cli.namespace;
            }
            namespace cli {
               interface source {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.cli.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.cli.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
               }
               namespace source {
                  interface CreateSpec {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
                  interface Info {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
               }
               interface command {
                  get(identity: cisService.vapi.metadata.cli.command.Identity): Promise<cisService.vapi.metadata.cli.command.Info>;
                  fingerprint(): Promise<string>;
                  list(path: string): Promise<Array<cisService.vapi.metadata.cli.command.Identity>>;
               }
               namespace command {
                  enum FormatterType {
                     "SIMPLE",
                     "TABLE",
                     "JSON",
                     "XML",
                     "CSV",
                     "HTML",
                  }
                  enum GenericType {
                     "NONE",
                     "OPTIONAL",
                     "LIST",
                     "OPTIONAL_LIST",
                     "LIST_OPTIONAL",
                  }
                  interface OptionInfo {
                     long_option: string;
                     short_option?: string;
                     field_name: string;
                     description: string;
                     type: string;
                     generic: cisService.vapi.metadata.cli.command.GenericType;
                  }
                  interface Identity {
                     path: string;
                     name: string;
                  }
                  interface OutputInfo {
                     structure_id: string;
                     output_fields: Array<cisService.vapi.metadata.cli.command.OutputFieldInfo>;
                  }
                  interface OutputFieldInfo {
                     field_name: string;
                     display_name: string;
                  }
                  interface Info {
                     identity: cisService.vapi.metadata.cli.command.Identity;
                     description: string;
                     service_id: string;
                     operation_id: string;
                     options: Array<cisService.vapi.metadata.cli.command.OptionInfo>;
                     formatter?: cisService.vapi.metadata.cli.command.FormatterType;
                     output_field_list: Array<cisService.vapi.metadata.cli.command.OutputInfo>;
                  }
               }
               interface namespace {
                  get(identity: cisService.vapi.metadata.cli.namespace.Identity): Promise<cisService.vapi.metadata.cli.namespace.Info>;
                  fingerprint(): Promise<string>;
                  list(): Promise<Array<cisService.vapi.metadata.cli.namespace.Identity>>;
               }
               namespace namespace {
                  interface Identity {
                     path: string;
                     name: string;
                  }
                  interface Info {
                     identity: cisService.vapi.metadata.cli.namespace.Identity;
                     description: string;
                     children: Array<cisService.vapi.metadata.cli.namespace.Identity>;
                  }
               }
            }
            interface authentication {
               source: authentication.source;
               service: authentication.service;
               component: authentication.component;
               package: authentication.package;
            }
            namespace authentication {
               interface source {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.authentication.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.authentication.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
               }
               namespace source {
                  interface CreateSpec {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
                  interface Info {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
               }
               interface service {
                  get(serviceId: string): Promise<cisService.vapi.metadata.authentication.ServiceInfo>;
                  list(): Promise<Array<string>>;
                  operation: service.operation;
               }
               namespace service {
                  interface operation {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.authentication.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
                  namespace operation {
                  }
               }
               interface component {
                  get(componentId: string): Promise<cisService.vapi.metadata.authentication.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               namespace component {
               }
               interface package {
                  get(packageId: string): Promise<cisService.vapi.metadata.authentication.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace package {
               }
               interface ComponentInfo {
                  packages: { [K: string]: cisService.vapi.metadata.authentication.PackageInfo };
               }
               interface AuthenticationInfo {
                  scheme_type: cisService.vapi.metadata.authentication.AuthenticationInfo.SchemeType;
                  session_manager?: string;
                  scheme: string;
               }
               namespace AuthenticationInfo {
                  enum SchemeType {
                     "SESSIONLESS", "SESSION_AWARE"
                  }
               }
               interface ComponentData {
                  info: cisService.vapi.metadata.authentication.ComponentInfo;
                  fingerprint: string;
               }
               interface PackageInfo {
                  schemes: Array<cisService.vapi.metadata.authentication.AuthenticationInfo>;
                  services: { [K: string]: cisService.vapi.metadata.authentication.ServiceInfo };
               }
               interface OperationInfo {
                  schemes: Array<cisService.vapi.metadata.authentication.AuthenticationInfo>;
               }
               interface ServiceInfo {
                  schemes: Array<cisService.vapi.metadata.authentication.AuthenticationInfo>;
                  operations: { [K: string]: cisService.vapi.metadata.authentication.OperationInfo };
               }
            }
            interface privilege {
               component: privilege.component;
               source: privilege.source;
               package: privilege.package;
               service: privilege.service;
            }
            namespace privilege {
               interface component {
                  get(componentId: string): Promise<cisService.vapi.metadata.privilege.ComponentData>;
                  fingerprint(componentId: string): Promise<string>;
                  list(): Promise<Array<string>>;
               }
               namespace component {
               }
               interface source {
                  reload(sourceId: string): Promise<void>;
                  get(sourceId: string): Promise<cisService.vapi.metadata.privilege.source.Info>;
                  fingerprint(sourceId: string): Promise<string>;
                  create(sourceId: string, spec: cisService.vapi.metadata.privilege.source.CreateSpec): Promise<void>;
                  list(): Promise<Array<string>>;
                  delete(sourceId: string): Promise<void>;
               }
               namespace source {
                  interface Info {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
                  interface CreateSpec {
                     description: string;
                     type: cisService.vapi.metadata.SourceType;
                     filepath?: string;
                     address?: string;
                  }
               }
               interface package {
                  get(packageId: string): Promise<cisService.vapi.metadata.privilege.PackageInfo>;
                  list(): Promise<Array<string>>;
               }
               namespace package {
               }
               interface service {
                  get(serviceId: string): Promise<cisService.vapi.metadata.privilege.ServiceInfo>;
                  list(): Promise<Array<string>>;
                  operation: service.operation;
               }
               namespace service {
                  interface operation {
                     get(serviceId: string, operationId: string): Promise<cisService.vapi.metadata.privilege.OperationInfo>;
                     list(serviceId: string): Promise<Array<string>>;
                  }
                  namespace operation {
                  }
               }
               interface OperationInfo {
                  privileges: Array<string>;
                  privilege_info: Array<cisService.vapi.metadata.privilege.PrivilegeInfo>;
               }
               interface ServiceInfo {
                  operations: { [K: string]: cisService.vapi.metadata.privilege.OperationInfo };
               }
               interface ComponentInfo {
                  packages: { [K: string]: cisService.vapi.metadata.privilege.PackageInfo };
               }
               interface PrivilegeInfo {
                  property_path: string;
                  privileges: Array<string>;
               }
               interface PackageInfo {
                  privileges: Array<string>;
                  services: { [K: string]: cisService.vapi.metadata.privilege.ServiceInfo };
               }
               interface ComponentData {
                  info: cisService.vapi.metadata.privilege.ComponentInfo;
                  fingerprint: string;
               }
            }
            enum SourceType {
               "FILE",
               "REMOTE",
            }
            interface SourceInfo {
               type: cisService.vapi.metadata.SourceType;
               file_name?: string;
               remote_addr?: string;
               msg_protocol?: string;
            }
            interface SourceCreateSpec {
               description: string;
               type: cisService.vapi.metadata.SourceType;
               filepath?: string;
               address?: string;
            }
         }
         interface std {
            errors: std.errors;
         }
         namespace std {
            interface errors {
            }
            namespace errors {
               interface Unauthorized {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface FeatureInUse {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface TransientIndication {
                  is_transient: boolean;
               }
               interface UnexpectedInput {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ResourceInUse {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface AlreadyInDesiredState {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ServiceUnavailable {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface AlreadyExists {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface InvalidArgument {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface InvalidElementType {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface InvalidRequest {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface UnableToAllocateResource {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface TimedOut {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface Error {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface FileLocations {
                  primary: string;
                  secondary: Array<string>;
               }
               interface Canceled {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ConcurrentChange {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface InvalidElementConfiguration {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ResourceInaccessible {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ArgumentLocations {
                  primary: string;
                  secondary: Array<string>;
               }
               interface NotFound {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface ResourceBusy {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface NotAllowedInCurrentState {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface Unauthenticated {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface InternalServerError {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface OperationNotFound {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
               interface Unsupported {
                  messages: Array<cisService.vapi.std.LocalizableMessage>;
                  data?: cisService.builtin.DYNAMICSTRUCTURE;
               }
            }
            interface DynamicID {
               type: string;
               id: string;
            }
            interface AuthenticationScheme {
               USER_PASSWORD: string;
               NO_AUTHENTICATION: string;
               SAML_BEARER_TOKEN: string;
               OAUTH_ACCESS_TOKEN: string;
               SESSION_ID: string;
               SAML_HOK_TOKEN: string;
            }
            interface LocalizableMessage {
               id: string;
               defaultMessage: string;
               args: Array<string>;
            }
         }
      }
      interface vcenter {
         vm: vcenter.vm;
         VM: vcenter.VM;
         folder: vcenter.folder;
         network: vcenter.network;
         cluster: vcenter.cluster;
         resourcePool: vcenter.resourcePool;
         datacenter: vcenter.datacenter;
         datastore: vcenter.datastore;
         host: vcenter.host;
      }
      namespace vcenter {
         interface vm {
            power: vm.power;
            hardware: vm.hardware;
         }
         namespace vm {
            interface power {
               suspend(vm: string): Promise<void>;
               stop(vm: string): Promise<void>;
               get(vm: string): Promise<cisService.vcenter.vm.power.Info>;
               start(vm: string): Promise<void>;
               reset(vm: string): Promise<void>;
            }
            namespace power {
               enum State {
                  "POWERED_OFF",
                  "POWERED_ON",
                  "SUSPENDED",
               }
               interface Info {
                  state: cisService.vcenter.vm.power.State;
                  clean_power_off?: boolean;
               }
            }
            interface hardware {
               upgrade(vm: string, version: cisService.vcenter.vm.hardware.Version): Promise<void>;
               get(vm: string): Promise<cisService.vcenter.vm.hardware.Info>;
               update(vm: string, spec: cisService.vcenter.vm.hardware.UpdateSpec): Promise<void>;
               boot: hardware.boot;
               adapter: hardware.adapter;
               cdrom: hardware.cdrom;
               serial: hardware.serial;
               floppy: hardware.floppy;
               memory: hardware.memory;
               disk: hardware.disk;
               ethernet: hardware.ethernet;
               parallel: hardware.parallel;
               cpu: hardware.cpu;
            }
            namespace hardware {
               interface boot {
                  device: boot.device;
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.boot.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.boot.UpdateSpec): Promise<void>;
               }
               namespace boot {
                  interface device {
                     set(vm: string, devices: Array<cisService.vcenter.vm.hardware.boot.device.Entry>): Promise<void>;
                     get(vm: string): Promise<Array<cisService.vcenter.vm.hardware.boot.device.Entry>>;
                  }
                  namespace device {
                     enum Type {
                        "CDROM",
                        "DISK",
                        "ETHERNET",
                        "FLOPPY",
                     }
                     interface Entry {
                        type: cisService.vcenter.vm.hardware.boot.device.Type;
                        nic?: string;
                        disks?: Array<string>;
                     }
                     interface EntryCreateSpec {
                        type: cisService.vcenter.vm.hardware.boot.device.Type;
                     }
                  }
                  enum Type {
                     "BIOS",
                     "EFI",
                  }
                  enum NetworkProtocol {
                     "IPV4",
                     "IPV6",
                  }
                  interface UpdateSpec {
                     type?: cisService.vcenter.vm.hardware.boot.Type;
                     efi_legacy_boot?: boolean;
                     network_protocol?: cisService.vcenter.vm.hardware.boot.NetworkProtocol;
                     delay?: number;
                     retry?: boolean;
                     retry_delay?: number;
                     enter_setup_mode?: boolean;
                  }
                  interface CreateSpec {
                     type?: cisService.vcenter.vm.hardware.boot.Type;
                     efi_legacy_boot?: boolean;
                     network_protocol?: cisService.vcenter.vm.hardware.boot.NetworkProtocol;
                     delay?: number;
                     retry?: boolean;
                     retry_delay?: number;
                     enter_setup_mode?: boolean;
                  }
                  interface Info {
                     type: cisService.vcenter.vm.hardware.boot.Type;
                     efi_legacy_boot?: boolean;
                     network_protocol?: cisService.vcenter.vm.hardware.boot.NetworkProtocol;
                     delay: number;
                     retry: boolean;
                     retry_delay: number;
                     enter_setup_mode: boolean;
                  }
               }
               interface adapter {
                  scsi: adapter.scsi;
                  sata: adapter.sata;
               }
               namespace adapter {
                  interface scsi {
                     get(vm: string, adapter: string): Promise<cisService.vcenter.vm.hardware.adapter.scsi.Info>;
                     create(vm: string, spec: cisService.vcenter.vm.hardware.adapter.scsi.CreateSpec): Promise<string>;
                     update(vm: string, adapter: string, spec: cisService.vcenter.vm.hardware.adapter.scsi.UpdateSpec): Promise<void>;
                     list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.adapter.scsi.Summary>>;
                     delete(vm: string, adapter: string): Promise<void>;
                  }
                  namespace scsi {
                     enum Sharing {
                        "NONE",
                        "VIRTUAL",
                        "PHYSICAL",
                     }
                     enum Type {
                        "BUSLOGIC",
                        "LSILOGIC",
                        "LSILOGICSAS",
                        "PVSCSI",
                     }
                     interface UpdateSpec {
                        sharing?: cisService.vcenter.vm.hardware.adapter.scsi.Sharing;
                     }
                     interface Summary {
                        adapter: string;
                     }
                     interface Info {
                        label: string;
                        type: cisService.vcenter.vm.hardware.adapter.scsi.Type;
                        scsi: cisService.vcenter.vm.hardware.ScsiAddressInfo;
                        pci_slot_number?: number;
                        sharing: cisService.vcenter.vm.hardware.adapter.scsi.Sharing;
                     }
                     interface CreateSpec {
                        type?: cisService.vcenter.vm.hardware.adapter.scsi.Type;
                        bus?: number;
                        pci_slot_number?: number;
                        sharing?: cisService.vcenter.vm.hardware.adapter.scsi.Sharing;
                     }
                  }
                  interface sata {
                     get(vm: string, adapter: string): Promise<cisService.vcenter.vm.hardware.adapter.sata.Info>;
                     create(vm: string, spec: cisService.vcenter.vm.hardware.adapter.sata.CreateSpec): Promise<string>;
                     list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.adapter.sata.Summary>>;
                     delete(vm: string, adapter: string): Promise<void>;
                  }
                  namespace sata {
                     enum Type {
                        "AHCI",
                     }
                     interface CreateSpec {
                        type?: cisService.vcenter.vm.hardware.adapter.sata.Type;
                        bus?: number;
                        pci_slot_number?: number;
                     }
                     interface Info {
                        label: string;
                        type: cisService.vcenter.vm.hardware.adapter.sata.Type;
                        bus: number;
                        pci_slot_number?: number;
                     }
                     interface Summary {
                        adapter: string;
                     }
                  }
               }
               interface cdrom {
                  disconnect(vm: string, cdrom: string): Promise<void>;
                  get(vm: string, cdrom: string): Promise<cisService.vcenter.vm.hardware.cdrom.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.cdrom.CreateSpec): Promise<string>;
                  update(vm: string, cdrom: string, spec: cisService.vcenter.vm.hardware.cdrom.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.cdrom.Summary>>;
                  delete(vm: string, cdrom: string): Promise<void>;
                  connect(vm: string, cdrom: string): Promise<void>;
               }
               namespace cdrom {
                  enum HostBusAdapterType {
                     "IDE",
                     "SATA",
                  }
                  enum BackingType {
                     "ISO_FILE",
                     "HOST_DEVICE",
                     "CLIENT_DEVICE",
                  }
                  enum DeviceAccessType {
                     "EMULATION",
                     "PASSTHRU",
                     "PASSTHRU_EXCLUSIVE",
                  }
                  interface CreateSpec {
                     type?: cisService.vcenter.vm.hardware.cdrom.HostBusAdapterType;
                     ide?: cisService.vcenter.vm.hardware.IdeAddressSpec;
                     sata?: cisService.vcenter.vm.hardware.SataAddressSpec;
                     backing?: cisService.vcenter.vm.hardware.cdrom.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface Summary {
                     cdrom: string;
                  }
                  interface Info {
                     type: cisService.vcenter.vm.hardware.cdrom.HostBusAdapterType;
                     label: string;
                     ide?: cisService.vcenter.vm.hardware.IdeAddressInfo;
                     sata?: cisService.vcenter.vm.hardware.SataAddressInfo;
                     backing: cisService.vcenter.vm.hardware.cdrom.BackingInfo;
                     state: cisService.vcenter.vm.hardware.ConnectionState;
                     start_connected: boolean;
                     allow_guest_control: boolean;
                  }
                  interface UpdateSpec {
                     backing?: cisService.vcenter.vm.hardware.cdrom.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.cdrom.BackingType;
                     iso_file?: string;
                     host_device?: string;
                     device_access_type?: cisService.vcenter.vm.hardware.cdrom.DeviceAccessType;
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.cdrom.BackingType;
                     iso_file?: string;
                     host_device?: string;
                     auto_detect?: boolean;
                     device_access_type?: cisService.vcenter.vm.hardware.cdrom.DeviceAccessType;
                  }
               }
               interface serial {
                  disconnect(vm: string, port: string): Promise<void>;
                  get(vm: string, port: string): Promise<cisService.vcenter.vm.hardware.serial.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.serial.CreateSpec): Promise<string>;
                  update(vm: string, port: string, spec: cisService.vcenter.vm.hardware.serial.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.serial.Summary>>;
                  delete(vm: string, port: string): Promise<void>;
                  connect(vm: string, port: string): Promise<void>;
               }
               namespace serial {
                  enum BackingType {
                     "FILE",
                     "HOST_DEVICE",
                     "PIPE_SERVER",
                     "PIPE_CLIENT",
                     "NETWORK_SERVER",
                     "NETWORK_CLIENT",
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.serial.BackingType;
                     file?: string;
                     host_device?: string;
                     auto_detect?: boolean;
                     pipe?: string;
                     no_rx_loss?: boolean;
                     network_location?: string;
                     proxy?: string;
                  }
                  interface CreateSpec {
                     yield_on_poll?: boolean;
                     backing?: cisService.vcenter.vm.hardware.serial.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface UpdateSpec {
                     yield_on_poll?: boolean;
                     backing?: cisService.vcenter.vm.hardware.serial.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.serial.BackingType;
                     file?: string;
                     host_device?: string;
                     pipe?: string;
                     no_rx_loss?: boolean;
                     network_location?: string;
                     proxy?: string;
                  }
                  interface Info {
                     label: string;
                     yield_on_poll: boolean;
                     backing: cisService.vcenter.vm.hardware.serial.BackingInfo;
                     state: cisService.vcenter.vm.hardware.ConnectionState;
                     start_connected: boolean;
                     allow_guest_control: boolean;
                  }
                  interface Summary {
                     port: string;
                  }
               }
               interface floppy {
                  disconnect(vm: string, floppy: string): Promise<void>;
                  get(vm: string, floppy: string): Promise<cisService.vcenter.vm.hardware.floppy.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.floppy.CreateSpec): Promise<string>;
                  update(vm: string, floppy: string, spec: cisService.vcenter.vm.hardware.floppy.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.floppy.Summary>>;
                  delete(vm: string, floppy: string): Promise<void>;
                  connect(vm: string, floppy: string): Promise<void>;
               }
               namespace floppy {
                  enum BackingType {
                     "IMAGE_FILE",
                     "HOST_DEVICE",
                     "CLIENT_DEVICE",
                  }
                  interface Info {
                     label: string;
                     backing: cisService.vcenter.vm.hardware.floppy.BackingInfo;
                     state: cisService.vcenter.vm.hardware.ConnectionState;
                     start_connected: boolean;
                     allow_guest_control: boolean;
                  }
                  interface UpdateSpec {
                     backing?: cisService.vcenter.vm.hardware.floppy.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface CreateSpec {
                     backing?: cisService.vcenter.vm.hardware.floppy.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface Summary {
                     floppy: string;
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.floppy.BackingType;
                     image_file?: string;
                     host_device?: string;
                     auto_detect?: boolean;
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.floppy.BackingType;
                     image_file?: string;
                     host_device?: string;
                  }
               }
               interface memory {
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.memory.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.memory.UpdateSpec): Promise<void>;
               }
               namespace memory {
                  interface Info {
                     size_MiB: number;
                     hot_add_enabled: boolean;
                     hot_add_increment_size_MiB?: number;
                     hot_add_limit_MiB?: number;
                  }
                  interface UpdateSpec {
                     size_MiB?: number;
                     hot_add_enabled?: boolean;
                  }
               }
               interface disk {
                  get(vm: string, disk: string): Promise<cisService.vcenter.vm.hardware.disk.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.disk.CreateSpec): Promise<string>;
                  update(vm: string, disk: string, spec: cisService.vcenter.vm.hardware.disk.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.disk.Summary>>;
                  delete(vm: string, disk: string): Promise<void>;
               }
               namespace disk {
                  enum BackingType {
                     "VMDK_FILE",
                  }
                  enum HostBusAdapterType {
                     "IDE",
                     "SCSI",
                     "SATA",
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.disk.BackingType;
                     vmdk_file?: string;
                  }
                  interface VmdkCreateSpec {
                     name?: string;
                     capacity?: number;
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.disk.BackingType;
                     vmdk_file?: string;
                  }
                  interface Summary {
                     disk: string;
                  }
                  interface Info {
                     label: string;
                     type: cisService.vcenter.vm.hardware.disk.HostBusAdapterType;
                     ide?: cisService.vcenter.vm.hardware.IdeAddressInfo;
                     scsi?: cisService.vcenter.vm.hardware.ScsiAddressInfo;
                     sata?: cisService.vcenter.vm.hardware.SataAddressInfo;
                     backing: cisService.vcenter.vm.hardware.disk.BackingInfo;
                     capacity?: number;
                  }
                  interface CreateSpec {
                     type?: cisService.vcenter.vm.hardware.disk.HostBusAdapterType;
                     ide?: cisService.vcenter.vm.hardware.IdeAddressSpec;
                     scsi?: cisService.vcenter.vm.hardware.ScsiAddressSpec;
                     sata?: cisService.vcenter.vm.hardware.SataAddressSpec;
                     backing?: cisService.vcenter.vm.hardware.disk.BackingSpec;
                     new_vmdk?: cisService.vcenter.vm.hardware.disk.VmdkCreateSpec;
                  }
                  interface UpdateSpec {
                     backing?: cisService.vcenter.vm.hardware.disk.BackingSpec;
                  }
               }
               interface ethernet {
                  disconnect(vm: string, nic: string): Promise<void>;
                  get(vm: string, nic: string): Promise<cisService.vcenter.vm.hardware.ethernet.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.ethernet.CreateSpec): Promise<string>;
                  update(vm: string, nic: string, spec: cisService.vcenter.vm.hardware.ethernet.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.ethernet.Summary>>;
                  delete(vm: string, nic: string): Promise<void>;
                  connect(vm: string, nic: string): Promise<void>;
               }
               namespace ethernet {
                  enum MacAddressType {
                     "MANUAL",
                     "GENERATED",
                     "ASSIGNED",
                  }
                  enum EmulationType {
                     "E1000",
                     "E1000E",
                     "PCNET32",
                     "VMXNET",
                     "VMXNET2",
                     "VMXNET3",
                  }
                  enum BackingType {
                     "STANDARD_PORTGROUP",
                     "HOST_DEVICE",
                     "DISTRIBUTED_PORTGROUP",
                     "OPAQUE_NETWORK",
                  }
                  interface CreateSpec {
                     type?: cisService.vcenter.vm.hardware.ethernet.EmulationType;
                     upt_compatibility_enabled?: boolean;
                     mac_type?: cisService.vcenter.vm.hardware.ethernet.MacAddressType;
                     mac_address?: string;
                     pci_slot_number?: number;
                     wake_on_lan_enabled?: boolean;
                     backing?: cisService.vcenter.vm.hardware.ethernet.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface Info {
                     label: string;
                     type: cisService.vcenter.vm.hardware.ethernet.EmulationType;
                     upt_compatibility_enabled?: boolean;
                     mac_type: cisService.vcenter.vm.hardware.ethernet.MacAddressType;
                     mac_address?: string;
                     pci_slot_number?: number;
                     wake_on_lan_enabled: boolean;
                     backing: cisService.vcenter.vm.hardware.ethernet.BackingInfo;
                     state: cisService.vcenter.vm.hardware.ConnectionState;
                     start_connected: boolean;
                     allow_guest_control: boolean;
                  }
                  interface UpdateSpec {
                     upt_compatibility_enabled?: boolean;
                     mac_type?: cisService.vcenter.vm.hardware.ethernet.MacAddressType;
                     mac_address?: string;
                     wake_on_lan_enabled?: boolean;
                     backing?: cisService.vcenter.vm.hardware.ethernet.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.ethernet.BackingType;
                     network?: string;
                     network_name?: string;
                     host_device?: string;
                     distributed_switch_uuid?: string;
                     distributed_port?: string;
                     connection_cookie?: number;
                     opaque_network_type?: string;
                     opaque_network_id?: string;
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.ethernet.BackingType;
                     network?: string;
                     distributed_port?: string;
                  }
                  interface Summary {
                     nic: string;
                  }
               }
               interface parallel {
                  disconnect(vm: string, port: string): Promise<void>;
                  get(vm: string, port: string): Promise<cisService.vcenter.vm.hardware.parallel.Info>;
                  create(vm: string, spec: cisService.vcenter.vm.hardware.parallel.CreateSpec): Promise<string>;
                  update(vm: string, port: string, spec: cisService.vcenter.vm.hardware.parallel.UpdateSpec): Promise<void>;
                  list(vm: string): Promise<Array<cisService.vcenter.vm.hardware.parallel.Summary>>;
                  delete(vm: string, port: string): Promise<void>;
                  connect(vm: string, port: string): Promise<void>;
               }
               namespace parallel {
                  enum BackingType {
                     "FILE",
                     "HOST_DEVICE",
                  }
                  interface Info {
                     label: string;
                     backing: cisService.vcenter.vm.hardware.parallel.BackingInfo;
                     state: cisService.vcenter.vm.hardware.ConnectionState;
                     start_connected: boolean;
                     allow_guest_control: boolean;
                  }
                  interface CreateSpec {
                     backing?: cisService.vcenter.vm.hardware.parallel.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface Summary {
                     port: string;
                  }
                  interface UpdateSpec {
                     backing?: cisService.vcenter.vm.hardware.parallel.BackingSpec;
                     start_connected?: boolean;
                     allow_guest_control?: boolean;
                  }
                  interface BackingSpec {
                     type: cisService.vcenter.vm.hardware.parallel.BackingType;
                     file?: string;
                     host_device?: string;
                  }
                  interface BackingInfo {
                     type: cisService.vcenter.vm.hardware.parallel.BackingType;
                     file?: string;
                     host_device?: string;
                     auto_detect?: boolean;
                  }
               }
               interface cpu {
                  get(vm: string): Promise<cisService.vcenter.vm.hardware.cpu.Info>;
                  update(vm: string, spec: cisService.vcenter.vm.hardware.cpu.UpdateSpec): Promise<void>;
               }
               namespace cpu {
                  interface Info {
                     count: number;
                     cores_per_socket: number;
                     hot_add_enabled: boolean;
                     hot_remove_enabled: boolean;
                  }
                  interface UpdateSpec {
                     count?: number;
                     cores_per_socket?: number;
                     hot_add_enabled?: boolean;
                     hot_remove_enabled?: boolean;
                  }
               }
               enum Version {
                  "VMX_03",
                  "VMX_04",
                  "VMX_06",
                  "VMX_07",
                  "VMX_08",
                  "VMX_09",
                  "VMX_10",
                  "VMX_11",
                  "VMX_12",
                  "VMX_13",
               }
               enum UpgradePolicy {
                  "NEVER",
                  "AFTER_CLEAN_SHUTDOWN",
                  "ALWAYS",
               }
               enum UpgradeStatus {
                  "NONE",
                  "PENDING",
                  "SUCCESS",
                  "FAILED",
               }
               interface UpdateSpec {
                  upgrade_policy?: cisService.vcenter.vm.hardware.UpgradePolicy;
                  upgrade_version?: cisService.vcenter.vm.hardware.Version;
               }
               interface Info {
                  version: cisService.vcenter.vm.hardware.Version;
                  upgrade_policy: cisService.vcenter.vm.hardware.UpgradePolicy;
                  upgrade_version?: cisService.vcenter.vm.hardware.Version;
                  upgrade_status: cisService.vcenter.vm.hardware.UpgradeStatus;
                  upgrade_error?: cisService.builtin.ANYERROR;
               }
               enum ConnectionState {
                  "CONNECTED",
                  "RECOVERABLE_ERROR",
                  "UNRECOVERABLE_ERROR",
                  "NOT_CONNECTED",
                  "UNKNOWN",
               }
               interface ConnectionInfo {
                  state: cisService.vcenter.vm.hardware.ConnectionState;
                  start_connected: boolean;
                  allow_guest_control: boolean;
               }
               interface IdeAddressInfo {
                  primary: boolean;
                  master: boolean;
               }
               interface ScsiAddressInfo {
                  bus: number;
                  unit: number;
               }
               interface IdeAddressSpec {
                  primary?: boolean;
                  master?: boolean;
               }
               interface ConnectionCreateSpec {
                  start_connected?: boolean;
                  allow_guest_control?: boolean;
               }
               interface ConnectionUpdateSpec {
                  start_connected?: boolean;
                  allow_guest_control?: boolean;
               }
               interface ScsiAddressSpec {
                  bus: number;
                  unit?: number;
               }
               interface SataAddressInfo {
                  bus: number;
                  unit: number;
               }
               interface SataAddressSpec {
                  bus: number;
                  unit?: number;
               }
            }
            enum GuestOS {
               "DOS",
               "WIN_31",
               "WIN_95",
               "WIN_98",
               "WIN_ME",
               "WIN_NT",
               "WIN_2000_PRO",
               "WIN_2000_SERV",
               "WIN_2000_ADV_SERV",
               "WIN_XP_HOME",
               "WIN_XP_PRO",
               "WIN_XP_PRO_64",
               "WIN_NET_WEB",
               "WIN_NET_STANDARD",
               "WIN_NET_ENTERPRISE",
               "WIN_NET_DATACENTER",
               "WIN_NET_BUSINESS",
               "WIN_NET_STANDARD_64",
               "WIN_NET_ENTERPRISE_64",
               "WIN_LONGHORN",
               "WIN_LONGHORN_64",
               "WIN_NET_DATACENTER_64",
               "WIN_VISTA",
               "WIN_VISTA_64",
               "WINDOWS_7",
               "WINDOWS_7_64",
               "WINDOWS_7_SERVER_64",
               "WINDOWS_8",
               "WINDOWS_8_64",
               "WINDOWS_8_SERVER_64",
               "WINDOWS_9",
               "WINDOWS_9_64",
               "WINDOWS_9_SERVER_64",
               "WINDOWS_HYPERV",
               "FREEBSD",
               "FREEBSD_64",
               "REDHAT",
               "RHEL_2",
               "RHEL_3",
               "RHEL_3_64",
               "RHEL_4",
               "RHEL_4_64",
               "RHEL_5",
               "RHEL_5_64",
               "RHEL_6",
               "RHEL_6_64",
               "RHEL_7",
               "RHEL_7_64",
               "CENTOS",
               "CENTOS_64",
               "CENTOS_6",
               "CENTOS_6_64",
               "CENTOS_7",
               "CENTOS_7_64",
               "ORACLE_LINUX",
               "ORACLE_LINUX_64",
               "ORACLE_LINUX_6",
               "ORACLE_LINUX_6_64",
               "ORACLE_LINUX_7",
               "ORACLE_LINUX_7_64",
               "SUSE",
               "SUSE_64",
               "SLES",
               "SLES_64",
               "SLES_10",
               "SLES_10_64",
               "SLES_11",
               "SLES_11_64",
               "SLES_12",
               "SLES_12_64",
               "NLD_9",
               "OES",
               "SJDS",
               "MANDRAKE",
               "MANDRIVA",
               "MANDRIVA_64",
               "TURBO_LINUX",
               "TURBO_LINUX_64",
               "UBUNTU",
               "UBUNTU_64",
               "DEBIAN_4",
               "DEBIAN_4_64",
               "DEBIAN_5",
               "DEBIAN_5_64",
               "DEBIAN_6",
               "DEBIAN_6_64",
               "DEBIAN_7",
               "DEBIAN_7_64",
               "DEBIAN_8",
               "DEBIAN_8_64",
               "DEBIAN_9",
               "DEBIAN_9_64",
               "DEBIAN_10",
               "DEBIAN_10_64",
               "ASIANUX_3",
               "ASIANUX_3_64",
               "ASIANUX_4",
               "ASIANUX_4_64",
               "ASIANUX_5_64",
               "ASIANUX_7_64",
               "OPENSUSE",
               "OPENSUSE_64",
               "FEDORA",
               "FEDORA_64",
               "COREOS_64",
               "VMWARE_PHOTON_64",
               "OTHER_24X_LINUX",
               "OTHER_24X_LINUX_64",
               "OTHER_26X_LINUX",
               "OTHER_26X_LINUX_64",
               "OTHER_3X_LINUX",
               "OTHER_3X_LINUX_64",
               "OTHER_LINUX",
               "GENERIC_LINUX",
               "OTHER_LINUX_64",
               "SOLARIS_6",
               "SOLARIS_7",
               "SOLARIS_8",
               "SOLARIS_9",
               "SOLARIS_10",
               "SOLARIS_10_64",
               "SOLARIS_11_64",
               "OS2",
               "ECOMSTATION",
               "ECOMSTATION_2",
               "NETWARE_4",
               "NETWARE_5",
               "NETWARE_6",
               "OPENSERVER_5",
               "OPENSERVER_6",
               "UNIXWARE_7",
               "DARWIN",
               "DARWIN_64",
               "DARWIN_10",
               "DARWIN_10_64",
               "DARWIN_11",
               "DARWIN_11_64",
               "DARWIN_12_64",
               "DARWIN_13_64",
               "DARWIN_14_64",
               "DARWIN_15_64",
               "DARWIN_16_64",
               "VMKERNEL",
               "VMKERNEL_5",
               "VMKERNEL_6",
               "VMKERNEL_65",
               "OTHER",
               "OTHER_64",
            }
         }
         interface VM {
            get(vm: string): Promise<cisService.vcenter.VM.Info>;
            create(spec: cisService.vcenter.VM.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.VM.FilterSpec): Promise<Array<cisService.vcenter.VM.Summary>>;
            delete(vm: string): Promise<void>;
         }
         namespace VM {
            interface CreateSpec {
               guest_OS: cisService.vcenter.vm.GuestOS;
               name?: string;
               placement?: cisService.vcenter.VM.PlacementSpec;
               hardware_version?: cisService.vcenter.vm.hardware.Version;
               boot?: cisService.vcenter.vm.hardware.boot.CreateSpec;
               boot_devices?: Array<cisService.vcenter.vm.hardware.boot.device.EntryCreateSpec>;
               cpu?: cisService.vcenter.vm.hardware.cpu.UpdateSpec;
               memory?: cisService.vcenter.vm.hardware.memory.UpdateSpec;
               disks?: Array<cisService.vcenter.vm.hardware.disk.CreateSpec>;
               nics?: Array<cisService.vcenter.vm.hardware.ethernet.CreateSpec>;
               cdroms?: Array<cisService.vcenter.vm.hardware.cdrom.CreateSpec>;
               floppies?: Array<cisService.vcenter.vm.hardware.floppy.CreateSpec>;
               parallel_ports?: Array<cisService.vcenter.vm.hardware.parallel.CreateSpec>;
               serial_ports?: Array<cisService.vcenter.vm.hardware.serial.CreateSpec>;
               sata_adapters?: Array<cisService.vcenter.vm.hardware.adapter.sata.CreateSpec>;
               scsi_adapters?: Array<cisService.vcenter.vm.hardware.adapter.scsi.CreateSpec>;
            }
            interface PlacementSpec {
               folder?: string;
               resource_pool?: string;
               host?: string;
               cluster?: string;
               datastore?: string;
            }
            interface Summary {
               vm: string;
               name: string;
               power_state: cisService.vcenter.vm.power.State;
               cpu_count?: number;
               memory_size_MiB?: number;
            }
            interface Info {
               guest_OS: cisService.vcenter.vm.GuestOS;
               name: string;
               power_state: cisService.vcenter.vm.power.State;
               hardware: cisService.vcenter.vm.hardware.Info;
               boot: cisService.vcenter.vm.hardware.boot.Info;
               boot_devices: Array<cisService.vcenter.vm.hardware.boot.device.Entry>;
               cpu: cisService.vcenter.vm.hardware.cpu.Info;
               memory: cisService.vcenter.vm.hardware.memory.Info;
               disks: { [K: string]: cisService.vcenter.vm.hardware.disk.Info };
               nics: { [K: string]: cisService.vcenter.vm.hardware.ethernet.Info };
               cdroms: { [K: string]: cisService.vcenter.vm.hardware.cdrom.Info };
               floppies: { [K: string]: cisService.vcenter.vm.hardware.floppy.Info };
               parallel_ports: { [K: string]: cisService.vcenter.vm.hardware.parallel.Info };
               serial_ports: { [K: string]: cisService.vcenter.vm.hardware.serial.Info };
               sata_adapters: { [K: string]: cisService.vcenter.vm.hardware.adapter.sata.Info };
               scsi_adapters: { [K: string]: cisService.vcenter.vm.hardware.adapter.scsi.Info };
            }
            interface FilterSpec {
               vms?: Array<string>;
               names?: Array<string>;
               folders?: Array<string>;
               datacenters?: Array<string>;
               hosts?: Array<string>;
               clusters?: Array<string>;
               resource_pools?: Array<string>;
               power_states?: Array<cisService.vcenter.vm.power.State>;
            }
         }
         interface folder {
            list(filter: cisService.vcenter.folder.FilterSpec): Promise<Array<cisService.vcenter.folder.Summary>>;
         }
         namespace folder {
            enum Type {
               "DATACENTER",
               "DATASTORE",
               "HOST",
               "NETWORK",
               "VIRTUAL_MACHINE",
            }
            interface FilterSpec {
               folders?: Array<string>;
               names?: Array<string>;
               type?: cisService.vcenter.folder.Type;
               parent_folders?: Array<string>;
               datacenters?: Array<string>;
            }
            interface Summary {
               folder: string;
               name: string;
               type: cisService.vcenter.folder.Type;
            }
         }
         interface network {
            list(filter: cisService.vcenter.network.FilterSpec): Promise<Array<cisService.vcenter.network.Summary>>;
         }
         namespace network {
            enum Type {
               "STANDARD_PORTGROUP",
               "DISTRIBUTED_PORTGROUP",
               "OPAQUE_NETWORK",
            }
            interface FilterSpec {
               networks?: Array<string>;
               names?: Array<string>;
               types?: Array<cisService.vcenter.network.Type>;
               folders?: Array<string>;
               datacenters?: Array<string>;
            }
            interface Summary {
               network: string;
               name: string;
               type: cisService.vcenter.network.Type;
            }
         }
         interface cluster {
            get(cluster: string): Promise<cisService.vcenter.cluster.Info>;
            list(filter: cisService.vcenter.cluster.FilterSpec): Promise<Array<cisService.vcenter.cluster.Summary>>;
         }
         namespace cluster {
            interface FilterSpec {
               clusters?: Array<string>;
               names?: Array<string>;
               folders?: Array<string>;
               datacenters?: Array<string>;
            }
            interface Info {
               name: string;
               resource_pool: string;
            }
            interface Summary {
               cluster: string;
               name: string;
               ha_enabled: boolean;
               drs_enabled: boolean;
            }
         }
         interface resourcePool {
            get(resourcePool: string): Promise<cisService.vcenter.resourcePool.Info>;
            list(filter: cisService.vcenter.resourcePool.FilterSpec): Promise<Array<cisService.vcenter.resourcePool.Summary>>;
         }
         namespace resourcePool {
            interface FilterSpec {
               resource_pools?: Array<string>;
               names?: Array<string>;
               parent_resource_pools?: Array<string>;
               datacenters?: Array<string>;
               hosts?: Array<string>;
               clusters?: Array<string>;
            }
            interface Info {
               name: string;
               resource_pools: Array<string>;
            }
            interface Summary {
               resource_pool: string;
               name: string;
            }
         }
         interface datacenter {
            get(datacenter: string): Promise<cisService.vcenter.datacenter.Info>;
            create(spec: cisService.vcenter.datacenter.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.datacenter.FilterSpec): Promise<Array<cisService.vcenter.datacenter.Summary>>;
            delete(datacenter: string, force: boolean): Promise<void>;
         }
         namespace datacenter {
            interface FilterSpec {
               datacenters?: Array<string>;
               names?: Array<string>;
               folders?: Array<string>;
            }
            interface Summary {
               datacenter: string;
               name: string;
            }
            interface CreateSpec {
               name: string;
               folder?: string;
            }
            interface Info {
               name: string;
               datastore_folder: string;
               host_folder: string;
               network_folder: string;
               vm_folder: string;
            }
         }
         interface datastore {
            get(datastore: string): Promise<cisService.vcenter.datastore.Info>;
            list(filter: cisService.vcenter.datastore.FilterSpec): Promise<Array<cisService.vcenter.datastore.Summary>>;
         }
         namespace datastore {
            enum Type {
               "VMFS",
               "NFS",
               "NFS41",
               "CIFS",
               "VSAN",
               "VFFS",
               "VVOL",
            }
            interface Info {
               name: string;
               type: cisService.vcenter.datastore.Type;
               accessible: boolean;
               free_space?: number;
               multiple_host_access: boolean;
               thin_provisioning_supported: boolean;
            }
            interface FilterSpec {
               datastores?: Array<string>;
               names?: Array<string>;
               types?: Array<cisService.vcenter.datastore.Type>;
               folders?: Array<string>;
               datacenters?: Array<string>;
            }
            interface Summary {
               datastore: string;
               name: string;
               type: cisService.vcenter.datastore.Type;
               free_space?: number;
               capacity?: number;
            }
         }
         interface host {
            disconnect(host: string): Promise<void>;
            create(spec: cisService.vcenter.host.CreateSpec): Promise<string>;
            list(filter: cisService.vcenter.host.FilterSpec): Promise<Array<cisService.vcenter.host.Summary>>;
            delete(host: string): Promise<void>;
            connect(host: string): Promise<void>;
         }
         namespace host {
            enum PowerState {
               "POWERED_ON",
               "POWERED_OFF",
               "STANDBY",
            }
            enum ConnectionState {
               "CONNECTED",
               "DISCONNECTED",
               "NOT_RESPONDING",
            }
            interface FilterSpec {
               hosts?: Array<string>;
               names?: Array<string>;
               folders?: Array<string>;
               datacenters?: Array<string>;
               standalone?: boolean;
               clusters?: Array<string>;
               connection_states?: Array<cisService.vcenter.host.ConnectionState>;
            }
            interface CreateSpec {
               hostname: string;
               port?: number;
               user_name: string;
               password: string;
               folder?: string;
               thumbprint_verification: cisService.vcenter.host.CreateSpec.ThumbprintVerification;
               thumbprint?: string;
               force_add?: boolean;
            }
            namespace CreateSpec {
               enum ThumbprintVerification {
                  "NONE", "THUMBPRINT"
               }
            }
            interface Summary {
               host: string;
               name: string;
               connection_state: cisService.vcenter.host.ConnectionState;
               power_state?: cisService.vcenter.host.PowerState;
            }
         }
      }
      interface ovf {
         importFlag: ovf.importFlag;
         capability: ovf.capability;
         exportFlag: ovf.exportFlag;
         exportSession: ovf.exportSession;
         probeImportSession: ovf.probeImportSession;
         importSession: ovf.importSession;
         libraryItem: ovf.libraryItem;
      }
      namespace ovf {
         interface importFlag {
            list(rp: string): Promise<Array<cisService.ovf.importFlag.Info>>;
         }
         namespace importFlag {
            interface Info {
               option: string;
               description: cisService.vapi.std.LocalizableMessage;
            }
         }
         interface capability {
            get(serverGuid: string): Promise<cisService.ovf.capability.CapabilityInfo>;
         }
         namespace capability {
            interface CapabilityInfo {
               import_ova: boolean;
               export_ova: boolean;
            }
         }
         interface exportFlag {
            list(): Promise<Array<cisService.ovf.exportFlag.Info>>;
         }
         namespace exportFlag {
            interface Info {
               option: string;
               description: cisService.vapi.std.LocalizableMessage;
            }
         }
         interface exportSession {
            preview(source: cisService.ovf.exportSession.SourceInfo, previewSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<cisService.ovf.exportSession.Preview>;
            get(id: string): Promise<cisService.ovf.exportSession.Info>;
            create(clientToken: string, source: cisService.ovf.exportSession.SourceInfo, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
            progress(id: string, percent: number): Promise<void>;
            delete(id: string): Promise<void>;
         }
         namespace exportSession {
            enum State {
               "EXPORT_PREPARING",
               "EXPORT_READY",
               "EXPORT_IN_PROGRESS",
               "EXPORT_COMPLETED",
               "EXPORT_ERROR",
            }
            enum TargetType {
               "DOWNLOAD_TARGET",
               "CONTENT_LIBRARY_TARGET",
            }
            enum TargetContentType {
               "OVF_TARGET",
               "OVA_TARGET",
            }
            interface SourceInfo {
               vapp_id?: string;
               vm_id?: string;
            }
            interface PreviewSpec {
               export_flags?: Array<string>;
               target_type?: cisService.ovf.exportSession.TargetType;
            }
            interface Info {
               state: cisService.ovf.exportSession.State;
               progress?: number;
               files: Array<cisService.ovf.OvfFileInfo>;
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
               library_item_id?: string;
            }
            interface CreateSpec {
               target_type: cisService.ovf.exportSession.TargetType;
               target_content_type?: cisService.ovf.exportSession.TargetContentType;
               export_flags?: Array<string>;
               name?: string;
               description?: string;
               content_library?: string;
               content_library_item?: string;
            }
            interface Preview {
               files: Array<cisService.ovf.exportSession.PreviewFile>;
            }
            interface PreviewFile {
               name: string;
            }
         }
         interface probeImportSession {
            createProbeImportSession(clientToken: string, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
            get(id: string): Promise<cisService.ovf.probeImportSession.Info>;
            tryInstantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<cisService.ovf.importSession.OvfValidationResult>;
            delete(id: string): Promise<void>;
         }
         namespace probeImportSession {
            enum State {
               "PROBE_IMPORT_OVF_TRANSFER",
               "PROBE_IMPORT_MSG_BUNDLES_TRANSFER",
               "PROBE_IMPORT_SELECTING_OVF_PARAMS",
               "PROBE_IMPORT_ERROR",
            }
            interface Info {
               state: cisService.ovf.probeImportSession.State;
               files: Array<cisService.ovf.OvfFileInfo>;
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
            }
         }
         interface importSession {
            preview(ovfDescriptor: string): Promise<cisService.ovf.importSession.Preview>;
            get(id: string): Promise<cisService.ovf.importSession.Info>;
            tryInstantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<cisService.ovf.importSession.OvfValidationResult>;
            instantiate(id: string, instantiationParameters: Array<cisService.builtin.DYNAMICSTRUCTURE>): Promise<void>;
            delete(id: string): Promise<void>;
            createForResourcePool(clientToken: string, resourcePool: string, hostSystem: string, folder: string, createSpec: cisService.builtin.DYNAMICSTRUCTURE): Promise<string>;
         }
         namespace importSession {
            enum PushSourceContentType {
               "OVF_SOURCE",
               "OVA_SOURCE",
            }
            enum State {
               "IMPORT_OVF_TRANSFER",
               "IMPORT_MSG_BUNDLES_TRANSFER",
               "IMPORT_SELECTING_OVF_PARAMS",
               "IMPORT_FILE_TRANSFER",
               "IMPORT_INSTANTIATING",
               "IMPORT_COMPLETED",
               "IMPORT_ERROR",
            }
            enum PushSourceOvfOption {
               "MANIFEST",
               "MANIFEST_CERTIFICATE",
               "NONE",
            }
            enum SourceType {
               "PUSH_SOURCE",
               "PULL_SOURCE",
               "CONTENT_LIBRARY_SOURCE",
            }
            interface Preview {
               files: Array<cisService.ovf.importSession.PreviewFile>;
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
            }
            interface Info {
               state: cisService.ovf.importSession.State;
               progress: number;
               files: Array<cisService.ovf.OvfFileInfo>;
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
               vapp_id?: string;
               vm_id?: string;
               customization_results?: { [K: string]: boolean };
            }
            interface CreateSpec {
               locale?: string;
               import_flags: Array<string>;
               source_type: cisService.ovf.importSession.SourceType;
               pull_source?: string;
               push_source_content_type?: cisService.ovf.importSession.PushSourceContentType;
               push_source_ovf_option?: cisService.ovf.importSession.PushSourceOvfOption;
               content_library_item?: string;
            }
            interface OvfValidationResult {
               parameters: Array<cisService.builtin.DYNAMICSTRUCTURE>;
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
            }
            interface PreviewFile {
               name: string;
            }
         }
         interface libraryItem {
            filter(ovfLibraryItemId: string, target: cisService.ovf.libraryItem.DeploymentTarget): Promise<cisService.ovf.libraryItem.OvfSummary>;
            create(clientToken: string, source: cisService.ovf.libraryItem.DeployableIdentity, target: cisService.ovf.libraryItem.CreateTarget, createSpec: cisService.ovf.libraryItem.CreateSpec): Promise<cisService.ovf.libraryItem.CreateResult>;
            deploy(clientToken: string, ovfLibraryItemId: string, target: cisService.ovf.libraryItem.DeploymentTarget, deploymentSpec: cisService.ovf.libraryItem.ResourcePoolDeploymentSpec): Promise<cisService.ovf.libraryItem.DeploymentResult>;
         }
         namespace libraryItem {
            interface DeploymentTarget {
               resourcePoolId: string;
               hostId?: string;
               folderId?: string;
            }
            interface CreateResult {
               succeeded: boolean;
               ovf_library_item_id?: string;
               error?: cisService.ovf.libraryItem.ResultInfo;
            }
            interface ResultInfo {
               errors: Array<cisService.ovf.OvfError>;
               warnings: Array<cisService.ovf.OvfWarning>;
               information: Array<cisService.ovf.OvfInfo>;
            }
            interface OvfSummary {
               name?: string;
               annotation?: string;
               EULAs: Array<string>;
               networks?: Array<string>;
               storage_groups?: Array<string>;
               additional_params?: Array<cisService.builtin.DYNAMICSTRUCTURE>;
            }
            interface DeploymentResult {
               succeeded: boolean;
               resourceId?: cisService.ovf.libraryItem.DeployableIdentity;
               error?: cisService.ovf.libraryItem.ResultInfo;
            }
            interface CreateSpec {
               name?: string;
               description?: string;
               flags?: Array<string>;
            }
            interface DeployableIdentity {
               type: string;
               id: string;
            }
            interface ResourcePoolDeploymentSpec {
               name?: string;
               annotation?: string;
               acceptAllEULA: boolean;
               networkMappings?: { [K: string]: string };
               storageMappings?: { [K: string]: cisService.ovf.libraryItem.StorageGroupMapping };
               storageProvisioning?: string; // thin, think, eagerZeroedThick
               storageProfileId?: string;
               locale?: string;
               flags?: Array<string>;
               additionalParameters?: Array<cisService.builtin.DYNAMICSTRUCTURE>;
               defaultDatastoreId?: string;
            }
            interface CreateTarget {
               library_id?: string;
               library_item_id?: string;
            }
            interface StorageGroupMapping {
               type: cisService.ovf.libraryItem.StorageGroupMapping.Type;
               datastore_id?: string;
               storage_profile_id?: string;
               provisioning?: cisService.ovf.DiskProvisioningType;
            }
            namespace StorageGroupMapping {
               enum Type {
                  "DATASTORE", "STORAGE_PROFILE"
               }
            }
         }
         enum DiskProvisioningType {
            "thin",
            "thick",
            "eagerZeroedThick",
         }
         interface ExtraConfig {
            key?: string;
            value?: string;
            virtual_system_id?: string;
         }
         interface ScaleOutParams {
            groups?: Array<cisService.ovf.ScaleOutGroup>;
            type?: string;
         }
         interface StorageMappingParams {
            available_storage_profiles?: Array<cisService.ovf.StorageProfileTarget>;
            available_disk_provisioning_types?: Array<cisService.ovf.DiskProvisioningType>;
            target_profile?: string;
            target_provisioning_type?: cisService.ovf.DiskProvisioningType;
            disk_groups?: Array<cisService.ovf.StorageDiskGroup>;
            type?: string;
         }
         interface TargetNetwork {
            id?: string;
            accessible?: boolean;
            inaccessible_reasons?: Array<cisService.ovf.TargetNetwork.InaccessibleReason>;
            name?: string;
         }
         namespace TargetNetwork {
            enum InaccessibleReason {
               "NO_ASSIGN_RIGHT"
            }
         }
         interface DatastoreDiskGroup {
            id?: string;
            name?: string;
            description?: string;
            target_profile?: string;
            target_datastore?: string;
            target_provisioning_type?: cisService.ovf.DiskProvisioningType;
         }
         interface OvfParams {
            type?: string;
         }
         interface DatastoreTarget {
            id?: string;
            name?: string;
            accessible?: boolean;
            inaccessible_reasons?: Array<cisService.ovf.DatastoreTarget.InaccessibleReason>;
            storage_profiles?: Array<string>;
         }
         namespace DatastoreTarget {
            enum InaccessibleReason {
               "NOT_CONNECTED", "MAINTENANCE_MODE", "READ_ONLY", "NO_ALLOCATE_RIGHT"
            }
         }
         interface SourceNetwork {
            name?: string;
            description?: string;
            target?: string;
         }
         interface OvfError {
            category: cisService.ovf.OvfMessage.Category;
            issues?: Array<cisService.ovf.ParseIssue>;
            name?: string;
            value?: string;
            message?: cisService.vapi.std.LocalizableMessage;
            error?: cisService.builtin.DYNAMICSTRUCTURE;
         }
         interface PropertyParams {
            properties?: Array<cisService.ovf.Property>;
            type?: string;
         }
         interface Property {
            class_id?: string;
            id?: string;
            instance_id?: string;
            category?: string;
            ui_optional?: boolean;
            label?: string;
            description?: string;
            type?: string;
            value?: string;
         }
         interface DeploymentOption {
            key?: string;
            label?: string;
            description?: string;
            default_choice?: boolean;
         }
         interface ExtraConfigParams {
            extra_configs?: Array<cisService.ovf.ExtraConfig>;
            exclude_keys?: Array<string>;
            include_keys?: Array<string>;
            type?: string;
         }
         interface StorageDiskGroup {
            id?: string;
            name?: string;
            description?: string;
            target_profile?: string;
            target_provisioning_type?: cisService.ovf.DiskProvisioningType;
         }
         interface VcenterExtensionParams {
            required?: boolean;
            registration_accepted?: boolean;
            type?: string;
         }
         interface IpAllocationParams {
            supported_allocation_scheme?: Array<cisService.ovf.IpAllocationParams.IpAllocationScheme>;
            supported_ip_allocation_policy?: Array<cisService.ovf.IpAllocationParams.IpAllocationPolicy>;
            ip_allocation_policy?: cisService.ovf.IpAllocationParams.IpAllocationPolicy;
            supported_ip_protocol?: Array<cisService.ovf.IpAllocationParams.IpProtocol>;
            ip_protocol?: cisService.ovf.IpAllocationParams.IpProtocol;
            type?: string;
         }
         namespace IpAllocationParams {
            enum IpProtocol {
               "IPV4", "IPV6"
            }
            enum IpAllocationPolicy {
               "DHCP", "TRANSIENT_IPPOOL", "STATIC_MANUAL", "STATIC_IPPOOL"
            }
            enum IpAllocationScheme {
               "DHCP", "OVF_ENVIRONMENT"
            }
         }
         interface OvfWarning {
            category: cisService.ovf.OvfMessage.Category;
            issues?: Array<cisService.ovf.ParseIssue>;
            name?: string;
            value?: string;
            message?: cisService.vapi.std.LocalizableMessage;
            error?: cisService.builtin.DYNAMICSTRUCTURE;
         }
         interface VServiceParams {
            dependencies?: Array<cisService.ovf.VServiceDependency>;
            type?: string;
         }
         interface VcenterGuestCustomizationParams {
            virtual_systems?: Array<string>;
            customizations?: { [K: string]: cisService.ovf.VcenterGuestCustomization };
            type?: string;
         }
         interface StorageProfileTarget {
            id?: string;
            name?: string;
         }
         interface DatastoreMappingParams {
            available_storage_profiles?: Array<cisService.ovf.StorageProfileTarget>;
            storage_profiles_enabled?: boolean;
            available_datastores?: Array<cisService.ovf.DatastoreTarget>;
            available_disk_provisioning_types?: Array<cisService.ovf.DiskProvisioningType>;
            target_profile?: string;
            target_datastore?: string;
            target_provisioning_type?: cisService.ovf.DiskProvisioningType;
            disk_groups?: Array<cisService.ovf.DatastoreDiskGroup>;
            type?: string;
         }
         interface VServiceProvider {
            key?: string;
            name?: string;
            description?: string;
            auto_bind?: boolean;
            status?: cisService.ovf.VServiceProvider.BindingStatus;
            validation_message?: string;
         }
         namespace VServiceProvider {
            enum BindingStatus {
               "RED", "YELLOW", "GREEN"
            }
         }
         interface OvfMessage {
            category: cisService.ovf.OvfMessage.Category;
            issues?: Array<cisService.ovf.ParseIssue>;
            name?: string;
            value?: string;
            message?: cisService.vapi.std.LocalizableMessage;
            error?: cisService.builtin.DYNAMICSTRUCTURE;
         }
         namespace OvfMessage {
            enum Category {
               "VALIDATION", "INPUT", "SERVER"
            }
         }
         interface ScaleOutGroup {
            id?: string;
            description?: string;
            instance_count?: number;
            minimum_instance_count?: number;
            maximum_instance_count?: number;
         }
         interface SizeParams {
            approximate_download_size?: number;
            approximate_flat_deployment_size?: number;
            approximate_sparse_deployment_size?: number;
            variable_disk_size?: boolean;
            type?: string;
         }
         interface VServiceDependency {
            id?: string;
            type?: string;
            name?: string;
            description?: string;
            required?: boolean;
            selected_provider_key?: string;
            available_providers?: Array<cisService.ovf.VServiceProvider>;
         }
         interface CertificateParams {
            issuer?: string;
            subject?: string;
            is_valid?: boolean;
            is_self_signed?: boolean;
            x509?: string;
            type?: string;
         }
         interface NameAndProductParams {
            name?: string;
            annotation?: string;
            virtual_app?: boolean;
            product_name?: string;
            vendor?: string;
            version?: string;
            full_version?: string;
            vendor_url?: string;
            product_url?: string;
            type?: string;
         }
         interface NetworkMappingParams {
            source_networks?: Array<cisService.ovf.SourceNetwork>;
            target_networks?: Array<cisService.ovf.TargetNetwork>;
            type?: string;
         }
         interface UnknownSection {
            tag: string;
            info: string;
         }
         interface OvfFileInfo {
            name: string;
            file_type: cisService.ovf.OvfFileInfo.FileType;
            optional_upload: boolean;
            file_url?: string;
            size: number;
            bytes_transferred: number;
            sha256: string;
         }
         namespace OvfFileInfo {
            enum FileType {
               "OVF", "MANIFEST", "CERT", "MSG_BUNDLE", "DISK", "CONTENT", "OVA"
            }
         }
         interface VcenterGuestCustomization {
            type: cisService.ovf.VcenterGuestCustomization.Type;
            specification_id?: string;
            xml?: string;
         }
         namespace VcenterGuestCustomization {
            enum Type {
               "SPECIFICATION", "XML"
            }
         }
         interface EulaParams {
            eulas?: Array<string>;
            all_EULA_accepted?: boolean;
            type?: string;
         }
         interface OvfInfo {
            messages: Array<cisService.vapi.std.LocalizableMessage>;
         }
         interface UnknownSectionParams {
            unknown_sections?: Array<cisService.ovf.UnknownSection>;
            type?: string;
         }
         interface DeploymentOptionParams {
            deployment_options?: Array<cisService.ovf.DeploymentOption>;
            selected_key?: string;
            type?: string;
         }
         interface ParseIssue {
            category: cisService.ovf.ParseIssue.Category;
            file: string;
            line_number: number;
            column_number: number;
            message: cisService.vapi.std.LocalizableMessage;
         }
         namespace ParseIssue {
            enum Category {
               "VALUE_ILLEGAL", "ATTRIBUTE_REQUIRED", "ATTRIBUTE_ILLEGAL", "ELEMENT_REQUIRED", "ELEMENT_ILLEGAL", "ELEMENT_UNKNOWN", "SECTION_UNKNOWN", "SECTION_RESTRICTION", "PARSE_ERROR", "GENERATE_ERROR", "VALIDATION_ERROR", "EXPORT_ERROR", "INTERNAL_ERROR"
            }
         }
      }
   }
}

export = vspherecis;