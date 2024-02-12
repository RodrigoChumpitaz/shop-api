export type ProductInsert = {
    product_name: string;
    description: string;
    price: number;
    weight: number;
    img: string;
    category: string;
    priceType: number;
    owners: string[];
};

export class IProductListOrigin {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: Date;
    id: string;
    product_name: string;
    description: string;
    price: number;
    weight: number;
    owners: any[];
    active: boolean;
    category: Category;
    priceType: PriceType;
    img: string;
};

export interface Category {
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: null;
    id: string;
    category_name: string;
    description: null;
    active: boolean;
}

export interface PriceType {
    id: number;
    priceType: string;
}
