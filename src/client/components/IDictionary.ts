export interface IDictionary<T> {
    [Key: string]: T;
}
export class TagDictionary {
    public Tags: IDictionary<string> = {};
}
