import { Category, PriceType } from "@core/types";

export interface IProductListResultApp {
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
    category: string;
    priceType: string;
    img: string;
}