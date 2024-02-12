import { SalesProductsInsert } from './infraestructure/model/sale_products';

export interface ISaleInsert {
    saleCode?: string;
    subTotal: number;
    total: number;
    salesDetail: SalesProductsInsert[]
}
