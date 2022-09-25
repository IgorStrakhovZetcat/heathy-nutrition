import { PayloadAction } from "@reduxjs/toolkit";
import { cartsService, ordersService, productsService } from "../config/service-config";
import { Cart } from "../models/Cart";
import { ClientData } from "../models/ClientData";
import { OperationCode } from "../models/OperationCode";
import { Order } from "../models/Order";
import { Product } from "../models/Product";



export const SET_PRODUCTS_ACTION = 'products/set';
export const OPERATION_CODE_ACTION = 'operation-code'
export const AUTH_ACTION = "auth";
export const SET_CARTS_ACTION = 'cart/set'
export const SET_ORDERS_ACTION = 'order/set'

export function setProducts(products: Product[]): PayloadAction<Product[]> {
    return {payload: products, type: SET_PRODUCTS_ACTION}
}
export function setOperationCode(operationCode: OperationCode): PayloadAction<OperationCode> {
    return {payload: operationCode, type: OPERATION_CODE_ACTION}
}
export function authAction(clientData: ClientData): PayloadAction<ClientData> {
    return {payload: clientData, type: AUTH_ACTION};
}
export function setCarts(carts: Cart[]): PayloadAction<Cart[]> {
    return {payload: carts, type: SET_CARTS_ACTION}
}
export function setOrders(orders: Order[]): PayloadAction<Order[]> {
    return {payload: orders, type: SET_ORDERS_ACTION}
}



export function addOrder(order: Order): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await ordersService.addOrder(order)
        const orders: Order[] = await ordersService.get()
        dispatch(setOrders(orders))
        dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err))
        }
        
    }
}
export function removeOrder(id: number): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await ordersService.removeOrder(id);
            const orders: Order[] = await ordersService.get();
            dispatch(setOrders(orders));
            dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}
export function addCart(cart: Cart, email: string): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await cartsService.addCart(cart, email)
        const carts: Cart[] = await cartsService.get()
        dispatch(setCarts(carts))
        dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err))
        }
        
    }
}
export function removeCart(email: string): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await cartsService.removeCart(email);
            const carts: Cart[] = await cartsService.get();
            dispatch(setCarts(carts));
            dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}
export function addToCart(cart: Cart, product: Product): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await cartsService.addToCart(cart, product)
        const carts: Cart[] = await cartsService.get()
        dispatch(setCarts(carts))
        dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err))
        }
    }
}
export function removeFromCart(cart: Cart, product: Product): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await cartsService.removeFromCart(cart, product)
        const carts: Cart[] = await cartsService.get()
        dispatch(setCarts(carts))
        dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err))
        }
    }
}
export function cleanCart(cart: Cart): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await cartsService.cleanCart(cart);
            const carts: Cart[] = await cartsService.get();
            dispatch(setCarts(carts));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}


export function addProduct(product: Product): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await productsService.add(product)
        const products: Product[] = await productsService.get()
        dispatch(setProducts(products))
        dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err))
        }
        
    }
}
export function removeProduct(id: number): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await productsService.remove(id);
            const products: Product[] = await productsService.get();
            dispatch(setProducts(products));
            dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}
export function updateProduct(product: Product): (dispatch: any) => void {
    return async (dispatch) => {
        try {
            await productsService.update(product.id, product);
            const products: Product[] = await productsService.get();
            dispatch(setProducts(products));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}