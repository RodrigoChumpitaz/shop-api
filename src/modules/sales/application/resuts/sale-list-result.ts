import { SalesProduct } from "@core/types";

export interface SaleListResultApp {
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
