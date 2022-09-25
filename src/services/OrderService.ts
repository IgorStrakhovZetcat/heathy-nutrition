import { Observable } from "rxjs";
import { OperationCode } from "../models/OperationCode";
import { Order } from "../models/Order";


export default interface OrderServise {
    addOrder(order: Order): Promise<void>;
    removeOrder(id: number): Promise<void>;
    get(): Promise<Order[]>
    getObservableDataOrder(): Observable<Order[] | OperationCode>
}