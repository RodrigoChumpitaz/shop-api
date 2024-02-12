import { getSlug } from '@core/services/generateSlug';

export interface ProductOptionals {
    readonly id: string;
    readonly description: string;
    readonly img: string;
    readonly owners: string[];
    readonly active: boolean;
    readonly slug: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly disabledAt: Date;
}
export interface ProductRequired {
    readonly product_name: string;
    readonly price: number;
    readonly weight: number;
    readonly category: string;
    readonly priceType: number;
}

export type ProductProperties = Partial<ProductOptionals> & ProductRequired;

export class Product {
    id: string;
    product_name: string;
    description: string;
    price: number;
    weight: number;
    category: string;
    priceType: number;
    img: string
    owners: string[];
    active: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: Date;

    constructor(properties: ProductProperties) {
        this.active = true;
        this.slug = getSlug();
        Object.assign(this, properties);
    }

    get properties(): ProductProperties {
        return {
            id: this.id,
            product_name: this.product_name,
            description: this.description,
            price: this.price,
            weight: this.weight,
            img: this.img,
            priceType: this.priceType,
            category: this.category,
            owners: this.owners,
            active: this.active,
            slug: this.slug,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            disabledAt: this.disabledAt
        };
    }
}
