import { Product } from '@products/domain/product.domain';
import { Sale, SaleProperties } from './sale.domain';

interface SaleInsertProps {
    subTotal: number;
    total: number;
    discount: number;
    products: Product[];
}
export class SaleFactory {
    static registerSale({
        subTotal,
        total,
        discount,
        products
    }: SaleInsertProps): Sale {
        if (subTotal <= 0) {
            throw new Error('El subtotal debe ser mayor a 0');
        }
        if (total <= 0) {
            throw new Error('El total debe ser mayor a 0');
        }

        if (discount < 0) {
            throw new Error('El descuento no puede ser negativo');
        }
        const properties: SaleProperties = {
            subTotal,
            total,
            discount,
            products
        };
        return new Sale(properties);
    }
}
