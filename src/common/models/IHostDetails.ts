export interface IHostDetails {
    Datastores: [
        {
            id: string;
            name: string;
        }];
    Networks: [
        {
            id: string;
            name: string;
        }];
    Cluster: string;
    id: string;
    name: string;
}
