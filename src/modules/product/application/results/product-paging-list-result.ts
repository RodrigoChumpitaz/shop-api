import { IProductListResultApp } from "./product-list-result";

export interface IProductListResultPagingApp{
    data: IProductListResultApp[],
    count: number
}