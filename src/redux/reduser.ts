import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { Cart } from "../models/Cart";
import { ClientData, emptyClientData } from "../models/ClientData";
import { OperationCode } from "../models/OperationCode";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { AUTH_ACTION, OPERATION_CODE_ACTION, SET_CARTS_ACTION, SET_ORDERS_ACTION, SET_PRODUCTS_ACTION } from "./actions";

export const CLIENT_DATA_ITEM = "client-data"
export const productsReduser: Reducer<Product[], PayloadAction<Product[]>> = 
(products = [], action): Product[] => {
    return action.type === SET_PRODUCTS_ACTION && action.payload.length > 0 ? action.payload : products;
}
export const clientDataReducer: Reducer<ClientData, PayloadAction<ClientData>> = 
(clientData = localStorage.getItem(CLIENT_DATA_ITEM) ? JSON.parse(localStorage.getItem(CLIENT_DATA_ITEM) as string) : emptyClientData, action): ClientData => {
    if (action.type === AUTH_ACTION) {
        localStorage.setItem(CLIENT_DATA_ITEM, JSON.stringify(action.payload))
        return action.payload;
    }
    return clientData;
}
export const operationCodeReducer: Reducer<OperationCode, PayloadAction<OperationCode>> = 
(operationCode = OperationCode.OK, action): OperationCode => {
    if (action.type === OPERATION_CODE_ACTION) {
        return action.payload;
    }
    return operationCode;
}
export const cartsReduser: Reducer<Cart[], PayloadAction<Cart[]>> = 
(carts = [], action): Cart[] => {
    return action.type === SET_CARTS_ACTION && action.payload.length > 0 ? action.payload : carts;
}
export const ordersReduser: Reducer<Order[], PayloadAction<Order[]>> = 
(orders = [], action): Order[] => {
    return action.type === SET_ORDERS_ACTION && action.payload.length > 0 ? action.payload : orders;
}