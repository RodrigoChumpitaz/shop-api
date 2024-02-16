import { IProductListResultApp } from '@products/application/results/product-list-result';
import { ProductEntity } from '../model/product.entity';
import { IProductListOrigin } from '@core/types';
import { converToType } from '@core/helpers/mapper';
import { IProductListResultPagingApp } from '../../application/results/product-paging-list-result';

export class ProductModelDto {
    static fromDataToApplicationPaging(
        products: ProductEntity[],
        count: number
    ): IProductListResultPagingApp {
        return {
            data: ProductModelDto.fromDataToApplication(products),
            count
        };
    }

    static fromDataToApplication(
        products: ProductEntity[]
    ): IProductListResultApp[] {
        const _products: IProductListOrigin[] = converToType(
            products,
            IProductListOrigin
        );
        return _products.map((product) => {
            return {
                id: product.id,
                product_name: product.product_name,
                description: product.description,
                price: product.price,
                priceType: product.priceType.priceType,
                weight: product.weight,
                active: product.active,
                category: product.category.category_name,
                img: product.img,
                owners: product.owners,
                slug: product.slug,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                disabledAt: product.disabledAt
            };
        });
    }

    static fromDataToApplicationOne(
        product: ProductEntity
    ): IProductListResultApp {
        const _product: IProductListOrigin = converToType(
            product,
            IProductListOrigin
        );
        return {
            id: _product.id,
            product_name: _product.product_name,
            description: _product.description,
            price: _product.price,
            priceType: _product.priceType.priceType,
            weight: _product.weight,
            active: _product.active,
            category: _product.category.category_name,
            img: _product.img,
            owners: _product.owners,
            slug: _product.slug,
            createdAt: _product.createdAt,
            updatedAt: _product.updatedAt,
            disabledAt: _product.disabledAt
        };
    }
}
