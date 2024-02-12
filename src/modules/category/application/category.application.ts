import { Category } from '@category/domain/category.domain';
import { CategoryRepository } from '@category/domain/category.repository';
import { CategoryInsertResultApp } from './results/category-insert-result';

export class CategoryApplication {
    constructor(private categoryRepository: CategoryRepository) {}

    async getCategories(): Promise<any[]> {
        return await this.categoryRepository.getCategories();
    }

    async getByPage(page: number, pageSize: number): Promise<any[]> {
        return await this.categoryRepository.getByPage(page, pageSize);
    }

    async createCategory(category: any): Promise<CategoryInsertResultApp> {
        return await this.categoryRepository.createCategory(category);
    }

    async getCategory(slug: string): Promise<any> {
        return await this.categoryRepository.getCategory(slug);
    }

    async deleteCategory(slug: string): Promise<boolean | Error> {
        return await this.categoryRepository.deleteCategory(slug);
    }

    async updateCategory(slug: string, category: any): Promise<any> {
        return await this.categoryRepository.updateCategory(slug, category);
    }

    async disableCategory(slug: string): Promise<boolean> {
        return await this.categoryRepository.disableCategory(slug);
    }
}
