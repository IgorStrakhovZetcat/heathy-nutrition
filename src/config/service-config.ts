import ProductsServiceFirebase from "../services/ProductsServiceFirebase";
import productData from '../config/productData.json'
import AuthServiceFirebase from "../services/AuthServiceFirebase";
import CartServiseFirebase from "../services/CartServiseFirebase";
import OrderServiceFirebase from "../services/OrderServiceFirebase";


export const productsService = new ProductsServiceFirebase(productData.minId, productData.maxId);
export const authService = new AuthServiceFirebase();
export const cartsService = new CartServiseFirebase();
export const ordersService = new OrderServiceFirebase(productData.minId, productData.maxId);