import { Category, CategoryProperties } from "./category.domain";

interface ICategoryInsert{
    categoryName: string;
    description: string;
}

export class CategoryFactory {
    static createCategory({categoryName, description}: ICategoryInsert): Category {
        if(categoryName.length < 3){
            throw new Error("El nombre de la categoría debe tener al menos 3 caracteres");
        }
        const properties: CategoryProperties = {
            category_name: categoryName,
            description
        }
        return new Category(properties);
    }
}