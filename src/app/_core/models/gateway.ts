import { IBaseModel } from "../interfaces/IBaseModel";
import { Peripheral } from "./peripheral";

export class Gateway implements IBaseModel {
    id: number = 0;
    name?: string;
    ip?: string;
    peripherals?: Peripheral[];
}