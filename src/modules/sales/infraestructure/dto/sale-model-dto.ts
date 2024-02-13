import { SaleInsertResultApp } from "@sale/application/resuts/sale-insert-result";
import { SaleEntity } from "../model/sale.entity";
import { converToType } from "@core/helpers/mapper";
import { SaleInsertResult, SaleListOrigin } from "@core/types";
import { ISaleListPagingResultApp } from "@sale/application/resuts/sale-list-paging-result";
import { SaleListResultApp } from "@sale/application/resuts/sale-list-result";

export class SaleModelDto{
    static fromDataToApplication(sale: SaleEntity): Partial<SaleInsertResult>{
        const _result = converToType(sale, Object) as SaleInsertResultApp;
        return {
            id: _result.id,
            saleCode: _result.saleCode,
            discount: _result.discount,
            subTotal: _result.subTotal,
            total: _result.total,
            slug: _result.slug,
            detail: _result.sales_products.map(sp => {
                return {
                    saleId: sp.saleId,
                    productName: sp.productId.product_name,
                    slug: sp.slug,
                    quantity: sp.quantity,
                    mount: sp.mount,
                    createdAt: sp.createdAt,
                    updatedAt: sp.updatedAt,
                    disabledAt: sp.disabledAt
                }
            }),
            createdAt: _result.createdAt,
            updatedAt: _result.updatedAt,
            disabledAt: _result.disabledAt
        }
    }

    static fromDataToApplicationList(sales: SaleEntity[]): SaleListResultApp[]{
        const _result: SaleListOrigin[] = converToType(sales, SaleListOrigin);
        return _result.map(sale => {
            return {
                id: sale.id,
                saleCode: sale.saleCode,
                subTotal: sale.subTotal,
                total: sale.total,
                discount: sale.discount,
                slug: sale.slug,
                createdAt: sale.createdAt,
                sales_products: sale.sales_products,
                updatedAt: sale.updatedAt,
                disabledAt: sale.disabledAt
            }
        })
    }

    static fromDataToApplicationPage(sales: SaleEntity[], count: number): ISaleListPagingResultApp{
        return {
            data: sales,
            count
        }
    }
}