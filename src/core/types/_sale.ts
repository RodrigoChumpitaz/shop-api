export class SaleInsertResult {
    id: string;
    saleCode: string;
    discount: number;
    subTotal: number;
    total: number;
    slug: string;
    detail: SalesProduct[];
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
}

export interface SalesProduct {
    saleId: string;
    productName: string;
    slug: string;
    quantity: number;
    mount: number;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
}

export class SaleListOrigin {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
    id: string;
    saleCode: string;
    subTotal: number;
    total: number;
    discount: number;
    sales_products: SalesProduct[];
}
