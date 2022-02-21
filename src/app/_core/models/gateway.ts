import { Peripheral } from "./peripheral";

export class Gateway {
    id: string = '';
    name?: string;
    ip?: string;
    Peripherals?: Peripheral[];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}