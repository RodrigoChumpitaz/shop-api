import { ICategoryListResultApp } from "@category/application/results/category-list-result";
import { CategoryEntity } from "../model/category.entity";
import { ICategoryListResultPagingApp } from '../../application/results/category-list-paging-result';

export class CategoryModelDto {

    static fromDataToApplicationList(categories: CategoryEntity[]): ICategoryListResultApp[]{
        return categories.map((category) => {
            return {
                id: category.id,
                category_name: category.category_name,
                description: category.description,
                active: category.active,
                slug: category.slug,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt
            }
        })
    }

    static fromDataToApplication(category: CategoryEntity): ICategoryListResultApp{
        return {
            id: category.id,
            category_name: category.category_name,
            description: category.description,
            active: category.active,
            slug: category.slug, 
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }

    static fromDataToApplicationPaging(categories: CategoryEntity[], count: number): ICategoryListResultPagingApp{
        return {
            data: CategoryModelDto.fromDataToApplicationList(categories),
            count
        }
    }
}