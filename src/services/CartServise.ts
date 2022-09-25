import { Observable } from "rxjs";
import { Cart } from "../models/Cart";
import { OperationCode } from "../models/OperationCode";
import { Product } from "../models/Product";


export default interface CartServise {
    addCart(cart: Cart, email: string): Promise<void>;
    removeCart(email: string): Promise<void>;
    get(): Promise<Cart[]>
    addToCart(cart: Cart, product: Product): Promise<void>;
    removeFromCart(cart: Cart, product: Product): Promise<void>;
    cleanCart(cart: Cart): Promise<void>;
    getObservableDataCart(): Observable<Cart[] | OperationCode>
}