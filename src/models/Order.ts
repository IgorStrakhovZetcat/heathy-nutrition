import { Product } from "./Product"

export type Order = {
    id: number;
    cart: Product[];
    email: string;
    totalCost: number;
    address: string;
    phoneNumber: number;
    shippingNotes: string;
    dateOrder: Date;
}
export function createOrder(id: number, cart: Product[], email: string, totalCost: number, address: string, phoneNumber: number, shippingNotes: string, dateOrder: Date): Order {
        return {id, cart, email, totalCost, address, phoneNumber, shippingNotes, dateOrder};
    }