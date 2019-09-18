import * as ip from "ip";
import * as vsphere from "../vmwarelibs/package/dist/vsphere.js";
import * as vspherests from "./definitions/vspherests";
import * as vspherevim from "./definitions/vspherevim";
import { IGuestinfoConfigSetting } from "./IGuestinfoConfigSetting";
import { IVcenter } from "./IVcenter";

export class VMWare implements IVcenter {
    public SessionManager: vspherevim.vimService.vim.ManagedObjectReference;
    public UserSession: vspherevim.vimService.vim.UserSession;

    public Host: string;
    public vimService: vspherevim.vimService;
    public stsService: vspherests.stsService;
    public samlToken: any;

    /** Connect to a vcenter server. */
    public async Connect(hostname: string, username: string, password: string): Promise<void> {
        this.Host = hostname;
        this.stsService = await vsphere.stsService(hostname);
        this.vimService = await vsphere.vimService(hostname);
        this.samlToken = await this.issueToken(this.stsService, username, password);
        const handler: any = this.appendToken.bind(null, this.stsService, this.samlToken);
        this.UserSession = await this.vimService.vimPort.login(this.vimService.serviceContent.sessionManager,
            username, password, null);
        this.SessionManager = this.vimService.serviceContent.sessionManager;
    }

    public async Disconnect(): Promise<void> {
        await this.vimService.vimPort.logout(this.vimService.serviceContent.sessionManager);
    }

    public async ReconfigureVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference,
                                    configSettings: IGuestinfoConfigSetting[],
                                    numCPUs: number,
                                    memoryMB: number) {
        const extraConfig: vspherevim.vimService.vim.OptionValue[] = [];
        for (const configSetting of configSettings) {
            extraConfig.push(this.vimService.vim.OptionValue({
                key: configSetting.key,
                value: this.vimService.xs.String({ value: configSetting.value }),
            }));
        }
        const spec = this.vimService.vim.VirtualMachineConfigSpec({
            extraConfig,
            numCPUs,
            memoryMB
        });
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.reconfigVMTask(vm, spec));
    }

    /** Set the extra config settings of a virtual machine. Useful for setting guestinfo variables.
     *
     */
    public async ReconfigureVM(vmName: string, configSettings: IGuestinfoConfigSetting[]) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        const extraConfig: vspherevim.vimService.vim.OptionValue[]
            = Array<vspherevim.vimService.vim.OptionValue>();
        for (const configSetting of configSettings) {
            extraConfig.push(this.vimService.vim.OptionValue({
                key: configSetting.key,
                value: this.vimService.xs.String({ value: configSetting.value }),
            }));
        }
        const spec = this.vimService.vim.VirtualMachineConfigSpec({
            extraConfig,
        });
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.reconfigVMTask(virtualMachine, spec));
    }

    /** Each host may have a child default resource pool. This is not visible in the vcenter UI.
     * This will return that resource pool.
     * Note: BROKEN - need to manage hosts that dont have resource pools when they are in a cluster
     */
    public async GetDefaultResourcePoolForHost(host: vspherevim.vimService.vim.ManagedObjectReference):
        Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        const { serviceContent: {
            propertyCollector,
            viewManager,
        }, vim, vimPort } = this.vimService;
        const containerView: vspherevim.vimService.vim.ManagedObjectReference =
            await this.vimService.vimPort.createContainerView(viewManager, host, ["ManagedEntity"], true);
        const targetObjects: vspherevim.vimService.vim.RetrieveResult =
                await vimPort.retrievePropertiesEx(propertyCollector, [
                    vim.PropertyFilterSpec({
                        objectSet: [vim.ObjectSpec({
                            obj: containerView,
                            selectSet: [vim.TraversalSpec({
                                path: "view",
                                type: "ContainerView",
                            })],
                            skip: false,
                        })],
                        propSet: [vim.PropertySpec({
                            pathSet: ["parent", "name"],
                            type: "ResourcePool",
                        })],
                    }),
                ], vim.RetrieveOptions());
        return vim.ManagedObjectReference({
            type: "ResourcePool",
            value: "test",
        });
    }

    public async GetSubnetIpOfVM(vmName: string, subnetIP: string, subnetMask: string): Promise<string[]> {
        const returnIps: string[] = [];
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        const guestInformation = await this.GetPropertyAny(virtualMachine, "guest");
        for (const netInfo of guestInformation.net) {
            for (const ipAddress of netInfo.ipAddress) {
                // check if ipv4
                if (ip.isV4Format(ipAddress)) {
                    const subnet = ip.subnet(subnetIP, subnetMask);
                    const cidrSubnet = subnetIP + "/" + subnet.subnetMaskLength;
                    if (ip.cidrSubnet(cidrSubnet).contains(ipAddress)) {
                        returnIps.push(ipAddress);
                    }
                }
            }
        }
        return returnIps;
    }

    /** Retrieve a managed object, ie. VM or datastore, using it's name and type.
     * @param {string} name - The name of the managed object.
     * @param {string} type - The type of the object. ie 'VirtualMachine'
     * @param {boolean} ignoreMissing - Default false. Will throw an exception if the object
     * is not found when set to false.
     * @return {vspherevim.vimService.vim.ManagedObjectReference} A managed object reference.
     */
    public async GetManagedObject(name: string,
                                  type: string,
                                  ignoreMissing: boolean = false)
                                  : Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        const { serviceContent: {
            propertyCollector,
            rootFolder,
            viewManager,
        }, vim, vimPort } = this.vimService;
        const containerView = await this.vimService.vimPort.createContainerView(viewManager, rootFolder, [type], true);
        const targetObjects = await vimPort.retrievePropertiesEx(propertyCollector, [
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: containerView,
                    selectSet: [vim.TraversalSpec({
                        path: "view",
                        type: containerView.type,
                    })],
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    pathSet: ["name", "parent"],
                    type,
                })],
            }),
        ], vim.RetrieveOptions());
        if (targetObjects === undefined) {
            if (ignoreMissing) { return null; }
            throw Error(`Unable to find object of type ${type} and name ${name} `);
        }
        const matchSet = targetObjects.objects.filter((p) => p.propSet[0].val === name);
        if (matchSet.length === 0) {
            if (ignoreMissing) { return null; }
            throw Error(`Unable to find object of type ${type} and name ${name} `);
        }
        return vim.ManagedObjectReference({
            type,
            value: matchSet[0].obj.value,
        });
    }

    public async BrowseDatastore(datastoreId: string, patternMatch: string): Promise<any[]> {
        const datastore = this.vimService.vim.ManagedObjectReference({
            type: "Datastore",
            value: datastoreId
        });
        const allDetails = await this.GetEverything(datastore);
        const browserDetails = allDetails.objects[0].propSet.filter((p) => p.name === "browser")[0].val;
        const datastoreName = allDetails.objects[0].propSet.filter((p) => p.name === "name")[0].val;
        const browser = this.vimService.vim.ManagedObjectReference({
            type: browserDetails.type,
            value: browserDetails.value,
        });
        const query = this.vimService.vim.FileQuery();
        const details = this.vimService.vim.FileQueryFlags({
            fileOwner: false,
            fileSize: true,
            fileType: true,
            modification: false
        });
        const searchSpec = this.vimService.vim.HostDatastoreBrowserSearchSpec({
            query: [ query ],
            details,
            searchCaseInsensitive: true,
            matchPattern: [ patternMatch ],
            sortFoldersFirst: false
        });
        const task = await this.vimService.vimPort.searchDatastoreSubFoldersTask(browser,
            "[" + datastoreName + "]", searchSpec);
        const results: any = await this.completeTask(this.vimService, task);
        const converted = [];
        results.forEach((item) => {
            const filePath = item.folderPath;
            item.file.forEach((file) => {
                converted.push({ filePath, filename: file.path});
            });
        });
        return converted;
    }

    /** Retrieve all objects of a certain type.
     * @param {string} type - The type of the object. ie 'VirtualMachine'
     * @param {boolean} ignoreMissing - Default false. Will throw an exception if the object
     * is not found when set to false.
     * @return {vspherevim.vimService.vim.ManagedObjectReference} A managed object reference.
     */
    public async GetManagedObjects(
        type: string,
        ignoreMissing: boolean = false,
        rootObject?: vspherevim.vimService.vim.ManagedObjectReference)
        : Promise<vspherevim.vimService.vim.RetrieveResult> {
        const { serviceContent: {
            propertyCollector,
            rootFolder,
            viewManager,
        }, vim, vimPort } = this.vimService;
        let containerView: vspherevim.vimService.vim.ManagedObjectReference;
        if (rootObject) {
            containerView = await this.vimService.vimPort.createContainerView(viewManager, rootObject, [type], true);
        } else {
            containerView = await this.vimService.vimPort.createContainerView(viewManager, rootFolder, [type], true);
        }
        const targetObjects = await vimPort.retrievePropertiesEx(propertyCollector, [
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: containerView,
                    selectSet: [vim.TraversalSpec({
                        path: "view",
                        type: containerView.type,
                    })],
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    pathSet: ["name", "parent"],
                    type,
                })],
            }),
        ], vim.RetrieveOptions());
        if (targetObjects === undefined) {
            if (ignoreMissing) { return null; }
            throw Error(`Unable to find object of type ${type} and name ${name} `);
        }
        return targetObjects;
    }

    public GetHostById = async (hostId: string): Promise<any> => {
        const host = this.vimService.vim.ManagedObjectReference({
            type: "HostSystem",
            value: hostId,
        });
        return await this.GetEverything(host);
    }

    public GetClusterById = async (clusterId: string): Promise<any> => {
        const host = this.vimService.vim.ManagedObjectReference({
            type: "ClusterComputeResource",
            value: clusterId,
        });
        return await this.GetEverything(host);
    }

    public GetVMById = async (vmId: string): Promise<vspherevim.vimService.vim.ManagedObjectReference> => {
        const vm = this.vimService.vim.ManagedObjectReference({
            type: "VirtualMachine",
            value: vmId,
        });
        return vm;
    }

    public GetDatastoreById = async (datastoreId: string):
        Promise<vspherevim.vimService.vim.ManagedObjectReference> => {
        const datastore = this.vimService.vim.ManagedObjectReference({
            type: "Datastore",
            value: datastoreId,
        });
        return datastore;
    }

    /** Use this function to explore all the properties of a Managed Object. Mainly useful for diagnostics. */
    public async GetEverything(objectToInspect: vspherevim.vimService.vim.ManagedObjectReference): Promise<any> {
        const { serviceContent: {
            propertyCollector,
        }, vim, vimPort } = this.vimService;
        const targetObjects = await vimPort.retrievePropertiesEx(propertyCollector, [
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: objectToInspect,
                    selectSet: [vim.TraversalSpec({
                        path: "view",
                        type: "ContainerView",
                    })],
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    all: true,
                    pathSet: [],
                    type: objectToInspect.type,
                })],
            }),
        ], vim.RetrieveOptions());
        return targetObjects;
    }

    /** Get a single property of a managed object when the property is expected to be a simple value. */
    public async GetProperty(objectToInspect: vspherevim.vimService.vim.ManagedObjectReference,
                             property: string): Promise<string> {
        const { serviceContent: {
            propertyCollector,
        }, vim, vimPort } = this.vimService;
        const targetObjects = await vimPort.retrievePropertiesEx(propertyCollector, [
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: objectToInspect,
                    selectSet: [vim.TraversalSpec({
                        path: "view",
                        type: "ContainerView",
                    })],
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    pathSet: [property],
                    type: objectToInspect.type,
                })],
            }),
        ], vim.RetrieveOptions());
        return targetObjects.objects[0].propSet[0].val;
    }

    /** Get a single property of a managed object when the property is expected to be a complex object. */
    public async GetPropertyAny(objectToInspect: vspherevim.vimService.vim.ManagedObjectReference,
                                property: string): Promise<any> {
        const { serviceContent: {
            propertyCollector,
        }, vim, vimPort } = this.vimService;
        const targetObjects = await vimPort.retrievePropertiesEx(propertyCollector, [
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: objectToInspect,
                    selectSet: [vim.TraversalSpec({
                        path: "view",
                        type: "ContainerView",
                    })],
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    pathSet: [property],
                    type: objectToInspect.type,
                })],
            }),
        ], vim.RetrieveOptions());
        return targetObjects.objects[0].propSet[0].val;
    }

    /** For a VM return it's parent host. */
    public async GetHostOfVM(virtualMachine: vspherevim.vimService.vim.ManagedObjectReference)
        : Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        const runtimeInfo = await this.GetPropertyAny(virtualMachine, "runtime");
        const hostId = runtimeInfo.host.value;
        return this.vimService.vim.ManagedObjectReference({
            type: "HostSystem",
            value: hostId,
        });
    }

    public async GetVMIdByName(vmName: string): Promise<string> {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        return virtualMachine.value;
    }

    /** Returns the current running or not running state of the VM */
    public async IsVMRunning(vmName: string): Promise<boolean> {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        const guestInformation = await this.GetPropertyAny(virtualMachine, "guest");
        return (guestInformation.guestState === "running");
    }

    public async TurnOnVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        const host = await this.GetHostOfVM(vm);
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.powerOnVMTask(vm, host));
    }

    public async TurnOffVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        await this.vimService.vimPort.shutdownGuest(vm);
    }

    /** Turn on a virtual machine. */
    public async TurnOnVM(vmName: string) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        const host = await this.GetHostOfVM(virtualMachine);
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.powerOnVMTask(virtualMachine, host));
    }

    public async CloneVM(vm: vspherevim.vimService.vim.ManagedObjectReference, folderName: string, name: string,
                         datastoreName: string): Promise<vspherevim.vimService.vim.ManagedObjectReference> {
        const folder = await this.GetManagedObject(folderName, "Folder", true);
        // TODO: Fix below
        const datastore = await this.GetManagedObject(datastoreName, "Datastore", true);

        const relocateSpec = this.vimService.vim.VirtualMachineRelocateSpec({
            datastore
        });
        const cloneSpec = this.vimService.vim.VirtualMachineCloneSpec({
            powerOn: false,
            location: relocateSpec,
            template: false
        });
        const task = await this.vimService.vimPort.cloneVMTask(vm, folder, name, cloneSpec);
        const taskresult = await this.completeTask(this.vimService, task);
        return taskresult as vspherevim.vimService.vim.ManagedObjectReference;
    }

    /** Turn off a virtual machine. Hard shutdown. Will wait till the machine is off. */
    public async TurnOffVM(vmName: string) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.powerOffVMTask(virtualMachine));
    }

    /** Turn off a virtual machine gracefully. */
    public async TurnOffVMGracefully(vmName: string) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        await this.vimService.vimPort.shutdownGuest(virtualMachine);
    }

    /** Restart a vitual machine. */
    public async RestartVM(vmName: string) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        await this.vimService.vimPort.rebootGuest(virtualMachine);
    }

    /** Destory a virtual machine. */
    public async DestroyVM(vmName: string) {
        const virtualMachine = await this.GetManagedObject(vmName, "VirtualMachine", true);
        if (virtualMachine === null) {
            throw Error("VM not found.");
        }
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.destroyTask(virtualMachine));
    }

    public async DestroyVMByMob(vm: vspherevim.vimService.vim.ManagedObjectReference) {
        await this.completeTask(this.vimService,
            await this.vimService.vimPort.destroyTask(vm));
    }

    /** Constructs the URL for a file on a host. */
    private BuildUploadURL(EXSiHostAddress: string, filename: string, dc: string, datastore: string): string {
        return `https://${EXSiHostAddress}/folder${filename}?dcPath=${dc}&dsName=${datastore}`;
    }

    private GetServiceTicket(url: string, verb: string)
        : Promise<vspherevim.vimService.vim.SessionManagerGenericServiceTicket> {
        const requestSpec: vspherevim.vimService.vim.SessionManagerHttpServiceRequestSpec =
            this.vimService.vim.SessionManagerHttpServiceRequestSpec(
            {
                method: verb,
                url,
            });
        return this.vimService.vimPort.acquireGenericServiceTicket(this.SessionManager, requestSpec);
    }

    private async completeTask(vimService: vspherevim.vimService,
                               task: vspherevim.vimService.vim.ManagedObjectReference) {
        const { serviceContent: {
            propertyCollector,
        }, vim, vimPort } = vimService;
        const filter = await vimPort.createFilter(propertyCollector,
            vim.PropertyFilterSpec({
                objectSet: [vim.ObjectSpec({
                    obj: task,
                    skip: false,
                })],
                propSet: [vim.PropertySpec({
                    pathSet: ["info.state", "info.error", "info.result"],
                    type: task.type,
                })],
            }), true);
        let version = "";
        let waiting = true;
        let returnMe = {};
        while (waiting) {
            const updateSet = await vimPort.waitForUpdatesEx(propertyCollector,
                version, vim.WaitOptions());
            version = updateSet.version;
            updateSet.filterSet.
                filter(({ filter: { value } }) => value === filter.value).
                reduce((previous, { objectSet }) => [...previous, ...objectSet], []).
                reduce((previous, { changeSet }) => [...previous, ...changeSet], []).
                forEach(({ name, val }) => {
                    if (name === "info.error" && val !== undefined) {
                        throw Error(val.localizedMessage);
                    }
                    if (name === "info.state" && val === vim.TaskInfoState.success) {
                        waiting = false;
                    }
                    if (name === "info.result") {
                        returnMe = val;
                    }
                });
        }
        await vimPort.destroyPropertyFilter(filter);
        return returnMe;
    }

    private appendToken(stsService: vspherests.stsService, samlToken: Node, { body, outgoing }) {
        if (outgoing) {
            const header: any = body.createElementNS(
                "http://schemas.xmlsoap.org/soap/envelope/", "Header");
            const securityElement: Node = stsService.serializeObject(
                stsService.wsse.SecurityHeaderType({
                    Timestamp: stsService.wsu.TimestampType({
                        Created: stsService.wsu.AttributedDateTime({
                            value: new Date().toISOString(),
                        }),
                        Expires: stsService.wsu.AttributedDateTime({
                            value: new Date(Date.now() + 9000 * 60 * 10).toISOString(),
                        }),
                    }),
                }), "Security");
            securityElement.appendChild(samlToken);
            header.appendChild(securityElement);
            body.firstChild.insertBefore(header, body.firstChild.firstChild);
        }
    }

    private async issueToken(stsService: vspherests.stsService, username: string, password: string) {
        let samlToken;
        const { addHandler, serializeObject, stsPort, wst13, wsse, wsu } = stsService;
        const requestSecurityToken: vspherests.stsService.wst13.RequestSecurityTokenType =
            wst13.RequestSecurityTokenType({
            Delegatable: true,
            KeyType: wst13.KeyTypeEnum
            ["http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer"],
            Lifetime: wst13.LifetimeType({
                Created: wsu.AttributedDateTime({
                    value: new Date().toISOString(),
                }),
                Expires: wsu.AttributedDateTime({
                    value: new Date(Date.now() + 9000 * 60 * 10).toISOString(),
                }),
            }),
            Renewing: wst13.RenewingType({
                Allow: true,
                OK: true,
            }),
            RequestType: wst13.RequestTypeOpenEnum
            ["http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue"],
            SignatureAlgorithm: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
            TokenType: "urn:oasis:names:tc:SAML:2.0:assertion",
        });
        addHandler(({ body, outgoing }) => {
            if (outgoing) {
                const securityHeader: vspherests.stsService.wsse.SecurityHeaderType = wsse.SecurityHeaderType({
                    Timestamp: wsu.TimestampType({
                        Created: wsu.AttributedDateTime({
                            value: new Date().toISOString(),
                        }),
                        Expires: wsu.AttributedDateTime({
                            value: new Date(Date.now() + 9000 * 60 * 10).toISOString(),
                        }),
                    }),
                    UsernameToken: wsse.UsernameTokenType({
                        Password: wsse.PasswordString({
                            value: password,
                        }),
                        Username: wsse.AttributedString({
                            value: username,
                        }),
                    }),
                });
                const header = body.createElementNS(
                    "http://schemas.xmlsoap.org/soap/envelope/", "Header");
                header.appendChild(serializeObject(securityHeader, "Security"));
                body.firstChild.insertBefore(header, body.firstChild.firstChild);
            }
        });
        addHandler(({ body, outgoing }) => {
            if (!outgoing) {
                samlToken = body.getElementsByTagNameNS(
                    "urn:oasis:names:tc:SAML:2.0:assertion", "Assertion")[0];
            }
        });
        await stsPort.issue(requestSecurityToken);
        return samlToken;
    }

}
