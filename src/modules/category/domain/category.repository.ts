import { CategoryInsertResult } from "@core/types";

export interface CategoryRepository {
    createCategory(category: any): Promise<CategoryInsertResult>;
    updateCategory(id: string, category: any): Promise<any>;
    deleteCategory(id: string): Promise<boolean>;
    getCategory(slug: string): Promise<any>;
    getCategories(): Promise<any[]>;
    getByPage(page: number, pageSize: number): Promise<CategoryInsertResult[]>;
    disableCategory(id: string): Promise<boolean>;
}