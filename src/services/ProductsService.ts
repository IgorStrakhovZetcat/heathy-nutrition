import { Observable } from "rxjs";
import { OperationCode } from "../models/OperationCode";
import { Product } from "../models/Product";


export default interface ProductService {
    add(product: Product): Promise<void>,
    remove(id: number): Promise<void>,
    update(id:number, product: Product): Promise<void>,
    get(): Promise<Product[]>
    getObservableDataProduct(): Observable<Product[] | OperationCode>
}