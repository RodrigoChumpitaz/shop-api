import { CategoryRepository } from "@category/domain/category.repository";
import { DatabaseBootstrap } from "@server/database.bootstrap";
import { CategoryEntity } from "./model/category.entity";
import { CategoryInsert } from "@core/types";
import { CategoryModelDto } from "./dto/category-model.dto";
import { ObjectLiteral, Repository } from "typeorm";
import { CategoryInsertResultApp } from "@category/application/results/category-insert-result";

export class CategoryInfraestructure implements CategoryRepository{
    async getByPage(page: number, pageSize: number): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const [ categories, count ] = await dbRepository.findAndCount({
                where: { active: true },
                skip: page * pageSize,
                take: pageSize
            })
            return CategoryModelDto.fromDataToApplicationPaging(categories, count);
        } catch (error) {
            return new Error(error);
        }
    }

    async createCategory(category: CategoryInsert): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            await dbRepository.save(category);
            return category;
        } catch (error) {
            return new Error(error);
        }
    }

    async updateCategory(slug: string, category: any): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const categoryById = await dbRepository.findOne({ where: { slug } });
            if(!categoryById) return new Error('Category not found');
            categoryById.category_name = category.category_name;
            await dbRepository.save(categoryById);
            return categoryById;
        } catch (error) {
            return new Error(error);
        }
    }

    async deleteCategory(slug: string): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const categoryById = await dbRepository.findOne({ where: { slug } });
            if(categoryById === null) return false;
            await dbRepository.remove(categoryById)
            return true;
        } catch (error) {
            return new Error(error);
        }
    }

    async getCategory(slug: string): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const categoryById = await dbRepository.findOne({ where: { slug } });
            if(!categoryById) return new Error('Category not found');
            return CategoryModelDto.fromDataToApplication(categoryById);
        } catch (error) {
            return new Error(error);
        }
    }
    async getCategories(): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const categoryListDb = await dbRepository.find({ where: { active: true } });
            return CategoryModelDto.fromDataToApplicationList(categoryListDb);
        } catch (error) {
            return new Error(error);
        }
    }
    
    async disableCategory(slug: string): Promise<boolean> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(CategoryEntity);
            const categoryDb = await dbRepository.findOne({ where: { slug } });
            if(categoryDb == null) return false;
            categoryDb.active = false;
            await dbRepository.save(categoryDb);
            return true;
        } catch (error) {
            return false
        }
    }
}