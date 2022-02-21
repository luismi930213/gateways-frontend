import { IBaseModel } from "../interfaces/IBaseModel";
import { Gateway } from "./gateway";

export class Peripheral implements IBaseModel {
    id: number = 0;
    vendor?: string;
    date?: Date;
    status: string = 'online';
    Gateway?: Gateway;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}