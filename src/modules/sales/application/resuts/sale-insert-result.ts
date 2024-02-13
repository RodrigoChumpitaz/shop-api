export interface SaleInsertResultApp {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
    id: string;
    saleCode: string;
    subTotal: number;
    total: number;
    discount: number;
    sales_products: SalesProduct[] | any[];
}

export interface SalesProduct {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
    saleId: string;
    productId: ProductID | unknown;
    quantity: number;
    mount: number;
}

export interface ProductID {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
    id: string;
    product_name: string;
    description: string;
    price: number;
    weight: number;
    owners: any[];
    active: boolean;
    img: string;
}
