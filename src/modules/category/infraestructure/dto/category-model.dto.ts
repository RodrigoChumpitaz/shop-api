import { ICategoryListResultApp } from '@category/application/results/category-list-result';
import { CategoryEntity } from '../model/category.entity';
import { ICategoryListResultPagingApp } from '../../application/results/category-list-paging-result';
import { converToType } from '@core/helpers/mapper';
import { CategoryListOrigin } from '@core/types';

export class CategoryModelDto {
    static fromDataToApplicationList(
        categories: CategoryEntity[]
    ): ICategoryListResultApp[] {
        const _result: CategoryListOrigin[] = converToType(
            categories,
            CategoryListOrigin
        );
        return _result.map((category) => {
            return {
                id: category.id,
                category_name: category.category_name,
                description: category.description as string,
                slug: category.slug,
                active: category.active,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt
            };
        });
    }

    static fromDataToApplication(
        category: CategoryEntity
    ): ICategoryListResultApp {
        const _result = converToType(category, CategoryListOrigin);
        return {
            id: _result.id,
            category_name: _result.category_name,
            description: _result.description,
            active: _result.active,
            slug: _result.slug,
            createdAt: _result.createdAt,
            updatedAt: _result.updatedAt
        };
    }

    static fromDataToApplicationPaging(
        categories: CategoryEntity[],
        count: number
    ): ICategoryListResultPagingApp {
        return {
            data: CategoryModelDto.fromDataToApplicationList(categories),
            count
        };
    }
}
