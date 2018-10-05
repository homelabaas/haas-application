
interface ITaskVmLookup {
    vmwareVmId: string;
    internalVmId: number;
    callbackMessage: () => void;
}

export class PhoneHomeTaskLookup {
    private Lookups: ITaskVmLookup[];
    constructor() {
        this.Lookups = [];
    }

    public RegisterNewLookup = (
            vmwareVmId: string,
            internalVmId: number,
            callbackMessage: () => void) => {
        this.Lookups.push({vmwareVmId, internalVmId, callbackMessage});
    }

    public PhoneHomeByVmid = async (vmwareVmId: string) => {
        const phoneHomeItem = this.Lookups.find((p) => p.vmwareVmId === vmwareVmId);
        if (phoneHomeItem) {
            await phoneHomeItem.callbackMessage();
            const index = this.Lookups.indexOf(phoneHomeItem);
            this.Lookups.splice(index, 1);
        }
    }
}

const phoneHomeTaskLookup: PhoneHomeTaskLookup =  new PhoneHomeTaskLookup();

// Only ever have one dependency manager
export function PhoneHomeTaskLookups() {
    return phoneHomeTaskLookup;
}
