export declare abstract class Base {
    id?: string;
    createdDate?: Date;
    updatedDate?: Date;
    constructor(data?: any, skipKeys?: string[]);
}
export interface IEntityBase extends Base {
    [prop: string]: any;
}
