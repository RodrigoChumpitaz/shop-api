import { getSlug } from '@core/services/generateSlug';
import { Product } from '@products/domain/product.domain';

export interface SaleOptionals {
    readonly id: string;
    readonly saleCode: string;
    readonly slug: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly disabledAt: Date;
}
export interface SaleRequireds {
    readonly subTotal: number;
    readonly total: number;
    readonly discount: number;
    readonly products: Product[];
}

export type SaleProperties = Partial<SaleOptionals> | SaleRequireds;

export class Sale {
    id: string;
    saleCode: string;
    subTotal: number;
    total: number;
    discount: number;
    products: Product[];
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: Date;

    constructor(sale: SaleProperties) {
        this.slug = getSlug();
        Object.assign(this, sale);
    }

    get Properties(): SaleProperties {
        return {
            id: this.id,
            saleCode: this.saleCode,
            subTotal: this.subTotal,
            total: this.total,
            discount: this.discount,
            products: this.products,
            slug: this.slug,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            disabledAt: this.disabledAt
        };
    }
}
