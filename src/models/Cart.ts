import { Product } from "./Product"

export type Cart = {
    email: string;
    productsInCart: Product[]
}
export function createCart(email: string, productsInCart: Product[]): Cart {
        return {email, productsInCart};
    }