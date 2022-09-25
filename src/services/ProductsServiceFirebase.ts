import {Observable, catchError, of} from 'rxjs'
import {map} from "rxjs/operators"
import {CollectionReference, collection, getFirestore, setDoc, doc,
     getDoc, deleteDoc} from 'firebase/firestore';
import {collectionData} from 'rxfire/firestore'
import { OperationCode } from '../models/OperationCode';
import ProductService from './ProductsService';
import appFirebase from '../config/firebase-config';
import { Product } from '../models/Product';
import { getRandomNumber } from '../util/randon';



const PRODUCTS_COLLECTION_NAME = "products";
export default class ProductServiceFirebase implements ProductService {
    private firestoreCollection: CollectionReference;
    constructor(private minId: number, private maxId: number) {
        try {
            this.firestoreCollection = collection(getFirestore(appFirebase), PRODUCTS_COLLECTION_NAME );
        } catch (err) {
            throw OperationCode.UNKNOWN;
        }
    }
    private async exists(id: number): Promise<boolean> {
        try {
            const docRef = doc(this.firestoreCollection, id.toString());
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (err) {
            throw OperationCode.AUTH_ERROR
        }

    }
    private async setProduct(product: Product) {
        try {
            await setDoc(doc(this.firestoreCollection, product.id.toString()), product);
        } catch (err) {
            throw OperationCode.AUTH_ERROR
        }
    }
    private async getId(): Promise<number> {
        let id: number;
        do {
            id = getRandomNumber(this.minId, this.maxId);
        } while(await this.exists(id));
        return id;
    }
    async add(product: Product): Promise<void> {
        const id =  await this.getId();
        product.id = id;
        this.setProduct(product);
    }
    async remove(id: number): Promise<void> {
        const isExists = await this.exists(id);
       if (!isExists) {
           throw OperationCode.UNKNOWN; //means wrong client functionality
       }
        try {
            await deleteDoc(doc(this.firestoreCollection, id.toString()));
        } catch (error) {
            throw OperationCode.AUTH_ERROR;
        }
    }
    async update(id: number, product: Product): Promise<void> {
        if (product.id !== id) {
            throw OperationCode.UNKNOWN; //means wrong client functionality
        }
        this.setProduct(product);
    }
    async get(): Promise<Product[]> {
        return [];
    }
    getObservableDataProduct(): Observable<Product[] | OperationCode> {
        return collectionData(this.firestoreCollection)
        .pipe(map(products => {
            return (products as Product[]).map(product => ({...product}))
         }), catchError(err => {
            return of(OperationCode.AUTH_ERROR)
        })) as Observable<Product[] | OperationCode>
    }
}



