import { Cart } from "../models/Cart";



export function getCart(carts: Cart[], email: string){
    const cart: Cart | undefined = carts.find(c => c.email === email)
    if(cart){
        return false
    } else {
        return cart;
    }
}