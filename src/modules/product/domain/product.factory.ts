import { Product, ProductProperties } from './product.domain';

interface ProductInsert {
    productName: string;
    price: number;
    weight: number;
    category: string
    priceType: number;
    description: string;
    owners?: string[];
    img: string;
}

export class ProductFactory {
    public static createProduct({
        productName,
        price,
        weight,
        category,
        priceType,
        description,
        owners,
        img
    }: ProductInsert): Product {
        if (productName.length < 3) {
            throw new Error('Product name must be at least 3 characters long');
        }
        if (price < 0) {
            throw new Error('Price must be greater than 0');
        }
        if (priceType < 0 || !priceType) {
            throw new Error('Price type must be greater than 0');
        }
        const properties: ProductProperties = {
            product_name: productName,
            price,
            weight,
            category,
            priceType,
            description,
            owners: owners || [],
            img
        };
        return new Product(properties);
    }
}
