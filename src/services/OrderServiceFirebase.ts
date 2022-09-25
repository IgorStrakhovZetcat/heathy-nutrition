import {Observable, catchError, of} from 'rxjs'
import {map} from "rxjs/operators"
import {CollectionReference, collection, getFirestore, setDoc, doc,
     getDoc, deleteDoc} from 'firebase/firestore';
import {collectionData} from 'rxfire/firestore'
import { OperationCode } from '../models/OperationCode';
import appFirebase from '../config/firebase-config';
import { getRandomNumber } from '../util/randon';
import OrderServise from './OrderService';
import { Order } from '../models/Order';


const ORDERS_COLLECTION_NAME = 'orders'
export default class OrderServiceFirebase implements OrderServise {
    private firestoreCollection: CollectionReference;
    constructor(private minId: number, private maxId: number) {
        try {
            this.firestoreCollection = collection(getFirestore(appFirebase), ORDERS_COLLECTION_NAME );
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
    private async setOrder(order: Order) {
        try {
            await setDoc(doc(this.firestoreCollection, order.id.toString()), order);
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
    async addOrder(order: Order): Promise<void> {
            const id =  await this.getId();
            order.id = id; 
            this.setOrder(order);  
        
        
    }
    async removeOrder(id: number): Promise<void> {
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
    async get(): Promise<Order[]> {
        return [];
    }
    getObservableDataOrder(): Observable<Order[] | OperationCode> {
        return collectionData(this.firestoreCollection)
        .pipe(map(orders => {
            return (orders as Order[]).map(order => ({...order, dateOrder:
                (order.dateOrder as any).toDate()})) 
           }), catchError(err => {
            return of(OperationCode.AUTH_ERROR)
        })) as Observable<Order[] | OperationCode>
    }
    
}