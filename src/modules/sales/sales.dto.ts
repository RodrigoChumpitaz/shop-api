import { SalesProducts } from './infraestructure/model/sale_products';

export interface ISaleInsert {
    saleCode?: string;
    subTotal: number;
    total: number;
    discount?: number;
    sales_products: SalesProducts[];
}

export interface ISaleDateQuery {
    initDate: Date;
    endDate: Date;
}
