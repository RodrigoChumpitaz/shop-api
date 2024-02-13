import { SalesProducts } from '@sale/infraestructure/model/sale_products';
import { Sale, SaleProperties } from './sale.domain';

interface SaleInsertProps {
    discount?: number;
    sales_products: SalesProducts[];
}
export class SaleFactory {
    static registerSale({
        discount,
        sales_products
    }: SaleInsertProps): Sale {
        if (discount! < 0) {
            throw new Error('El descuento no puede ser negativo');
        }
        const properties: SaleProperties = {
            // subTotal,
            // total,
            discount: discount!,
            sales_products
        };
        return new Sale(properties);
    }
}
