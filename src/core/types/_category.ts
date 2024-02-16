import { CategoryInsertResultApp } from '@category/application/results/category-insert-result';

export interface CategoryInsert {
    category_name: string;
}

export type CategoryInsertResult = CategoryInsertResultApp;

export class CategoryListOrigin {
    id: string;
    category_name: string;
    description: null | string;
    active: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
