import { CategoryRepository } from '@category/domain/category.repository';
import { DatabaseBootstrap } from '@server/database.bootstrap';
import { CategoryEntity } from './model/category.entity';
import { CategoryInsert } from '@core/types';
import { CategoryModelDto } from './dto/category-model.dto';

export class CategoryInfraestructure implements CategoryRepository {
    async getByPage(page: number, pageSize: number): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const [categories, count] =
                        await categoryRepository.findAndCount({
                            where: { active: true },
                            skip: page * pageSize,
                            take: pageSize
                        });
                    return CategoryModelDto.fromDataToApplicationPaging(
                        categories,
                        count
                    );
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }

    async createCategory(category: CategoryInsert): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categorySaved =
                        await categoryRepository.save(category);
                    return CategoryModelDto.fromDataToApplication(
                        categorySaved
                    );
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }

    async updateCategory(slug: string, category: any): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categoryById = await categoryRepository.exists({
                        where: { slug }
                    });
                    if (!categoryById) return new Error('Category not found');
                    await categoryRepository
                        .createQueryBuilder()
                        .update(CategoryEntity)
                        .set({
                            category_name: category.category_name,
                            description: category.description
                        })
                        .where('slug = :slug', { slug })
                        .execute();
                    return {
                        message: 'Category updated successfully',
                        category
                    };
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }

    async deleteCategory(slug: string): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categoryById = await categoryRepository.findOne({
                        where: { slug }
                    });
                    if (categoryById === null) return false;
                    await categoryRepository.remove(categoryById);
                    return true;
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }

    async getCategory(slug: string): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categoryById = await categoryRepository.findOne({
                        where: { slug }
                    });
                    if (!categoryById) return new Error('Category not found');
                    return CategoryModelDto.fromDataToApplication(categoryById);
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }
    async getCategories(): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categoryListDb = await categoryRepository.find({
                        where: { active: true },
                        order: {
                            category_name: 'ASC'
                        }
                    });
                    return CategoryModelDto.fromDataToApplicationList(
                        categoryListDb
                    );
                }
            );
        } catch (error) {
            return new Error(error);
        }
    }

    async disableCategory(slug: string): Promise<boolean> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const categoryRepository =
                        transactionEntityManager.getRepository(CategoryEntity);
                    const categoryDb = await categoryRepository.exists({
                        where: { slug }
                    });
                    if (!categoryDb) return false;
                    await categoryRepository
                        .createQueryBuilder()
                        .update(CategoryEntity)
                        .set({ active: false })
                        .where('slug = :slug', { slug })
                        .execute();
                    return true;
                }
            );
        } catch (error) {
            return false;
        }
    }
}
