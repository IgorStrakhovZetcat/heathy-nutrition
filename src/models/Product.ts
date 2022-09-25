 export type Product = {
    id: number;
    title: string;
    img: any,
    description: string;
    cost: number;
    calories: number;
    weight: number;
    type: string;
 }
 export function createProduct(id: number, title: string, img: any, description: string,
   cost: number, calories: number, weight: number, type: string): Product {
       return {id, title, img, description, cost, calories, weight, type};
   }