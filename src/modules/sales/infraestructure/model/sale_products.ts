export type SalesProductsInsert = {
    saleId?: string;
    producId: string
    quantity: number;
    mount: number;
}
export class SalesProducts {
    saleId: string;
    productId: string
    quantity: number;
    mount: number;
    // constructor(properties: SalesProductsInsert){
    //     Object.assign(this, properties);
    // }
}
