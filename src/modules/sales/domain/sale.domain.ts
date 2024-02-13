import { getSlug } from '@core/services/generateSlug';
import { SalesProducts } from '@sale/infraestructure/model/sale_products';


export interface SaleOptionals {
    readonly id: string;
    readonly saleCode: string;
    readonly slug: string;
    readonly subTotal: number;
    readonly total: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly disabledAt: Date;
}
export interface SaleRequireds {
    readonly discount: number;
    readonly sales_products: SalesProducts[];
}

export type SaleProperties = Partial<SaleOptionals> | SaleRequireds;

export class Sale {
    id: string;
    saleCode: string;
    subTotal: number;
    total: number;
    discount: number;
    sales_products: SalesProducts[];
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
            sales_products: this.sales_products,
            slug: this.slug,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            disabledAt: this.disabledAt
        };
    }
}
