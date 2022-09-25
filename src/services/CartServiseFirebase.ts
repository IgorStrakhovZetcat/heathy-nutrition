import {Observable, catchError, of} from 'rxjs'
import {map} from "rxjs/operators"
import {CollectionReference, collection, getFirestore, setDoc, doc,
     getDoc, deleteDoc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import {collectionData} from 'rxfire/firestore'
import { OperationCode } from '../models/OperationCode';
import appFirebase from '../config/firebase-config';
import CartServise from "./CartServise";
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';


const CART_COLLECTION_NAME = 'carts'
export default class CartServiseFirebase implements CartServise {
    private firestoreCollection: CollectionReference;
    constructor() {
        try {
            this.firestoreCollection = collection(getFirestore(appFirebase), CART_COLLECTION_NAME );
        } catch (err) {
            throw OperationCode.UNKNOWN;
        }
    }
    async addToCart(cart: Cart, product: Product): Promise<void> {
        const isExists = await this.exists(cart.email);
       if (!isExists) {
           throw OperationCode.UNKNOWN; //means wrong client functionality
       }
        // const docRef = doc(this.firestoreCollection, cart.email);
        // await updateDoc(docRef, {productsInCart: arrayUnion(product)})
        let isInArray = false;
        cart.productsInCart.forEach(prod => {
            if(prod.id === product.id) {
                isInArray = true
            }
        })
        if(!isInArray){
           cart.productsInCart.push(product)
        this.setCart(cart); 
        }
    }
    async removeFromCart(cart: Cart, product: Product): Promise<void> {
        const isExists = await this.exists(cart.email);
       if (!isExists) {
           throw OperationCode.UNKNOWN; //means wrong client functionality
       }
       if(cart.productsInCart.length != 0){
        let index = cart.productsInCart.indexOf(product)
        cart.productsInCart.splice(index, 1)
        this.setCart(cart);
       }
       
    }
    async cleanCart(cart: Cart): Promise<void> {
        const isExists = await this.exists(cart.email);
       if (!isExists) {
           throw OperationCode.UNKNOWN; //means wrong client functionality
       }
       cart.productsInCart.splice(0, cart.productsInCart.length)
       this.setCart(cart); 
    }
    async get(): Promise<Cart[]> {
        return [];
    }
    private async exists(email: string): Promise<boolean> {
        try {
            const docRef = doc(this.firestoreCollection, email);
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (err) {
            throw OperationCode.AUTH_ERROR
        }

    }
    

    private async setCart(cart: Cart) {
        try {
            await setDoc(doc(this.firestoreCollection, cart.email), cart);
        } catch (err) {
            throw OperationCode.AUTH_ERROR
        }
    }


    async addCart(cart: Cart, email: string): Promise<void> {
        cart.email = email; 
        this.setCart(cart);   
    }
    async removeCart(email: string): Promise<void> {
        const isExists = await this.exists(email);
        if (!isExists) {
           throw OperationCode.UNKNOWN; //means wrong client functionality
        }
        try {
            await deleteDoc(doc(this.firestoreCollection, email));
        } catch (error) {
            throw OperationCode.AUTH_ERROR;
        }
    }
    getObservableDataCart(): Observable<Cart[] | OperationCode> {
        return collectionData(this.firestoreCollection)
        .pipe(map(carts => {
            return (carts as Cart[]).map(cart => ({...cart}))
         }), catchError(err => {
            return of(OperationCode.AUTH_ERROR)
        })) as Observable<Cart[] | OperationCode>
    }
}