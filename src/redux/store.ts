import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { Cart } from "../models/Cart"
import { ClientData } from "../models/ClientData"
import { OperationCode } from "../models/OperationCode"
import { Order } from "../models/Order"
import { Product } from "../models/Product"
import { cartsReduser, clientDataReducer, operationCodeReducer, ordersReduser, productsReduser } from "./reduser"


export type StateType = {
    products: Product[],
    clientData: ClientData,
    operationCode: OperationCode,
    carts: Cart[],
    orders: Order[]
}
const reducer = combineReducers<StateType> ({
    products: productsReduser as any,
    clientData: clientDataReducer as any,
    operationCode: operationCodeReducer as any,
    carts: cartsReduser as any,
    orders: ordersReduser as any
})
export const store = configureStore({reducer, middleware: (getMiddleware) => getMiddleware({
    serializableCheck: false
})})