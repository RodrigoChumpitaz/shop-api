import { Request, Response } from "express";
import { CategoryInfraestructure } from './infraestructure/category.infraestructure';
import { CategoryApplication } from "./application/category.application";
import { CategoryFactory } from "./domain/category.factory";

const categoryInfraestructure = new CategoryInfraestructure();
const categoryApplication = new CategoryApplication(categoryInfraestructure)

export class CategoryController {
    constructor(){
        this.createCategory = this.createCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getCategoryByPage = this.getCategoryByPage.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.disableCategory = this.disableCategory.bind(this);
    }

    async createCategory(req: Request, res: Response){
        const { categoryName, description } = req.body;
        const categoryFactory = CategoryFactory.createCategory({categoryName, description});
        if(categoryFactory instanceof Error){
            return res.status(400).json({message: categoryFactory.message})
        }
        const categoryResult = await categoryApplication.createCategory(categoryFactory);
        return res.status(201).json(categoryResult);
    }

    async getCategories(req: Request, res: Response){
        const categories = await categoryApplication.getCategories();
        return res.status(200).json(categories);
    }

    async getCategory(req: Request, res: Response){
        const { slug } = req.params;
        const category = await categoryApplication.getCategory(slug);
        if(category instanceof Error){
            return res.status(404).json({message: category.message});
        }
        return res.status(200).json(category);
    }

    async getCategoryByPage(req: Request, res: Response){
        const { page, pageSize } = req.params;
        const categories = await categoryApplication.getByPage(Number(page), Number(pageSize));
        return res.status(200).json(categories);
    }

    async updateCategory(req: Request, res: Response){
        const { slug } = req.params;
        const { categoryName, description } = req.body;
        const _category = await categoryApplication.updateCategory(slug, { category_name: categoryName, description })

        if(_category instanceof Error){
            return res.status(404).json({message: _category.message});
        }
        return res.status(200).json(_category);
    }
    
    async deleteCategory(req: Request, res: Response){
        const { slug } = req.params;
        const _category = await categoryApplication.deleteCategory(slug);
        if(!_category){
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json({message: 'Category deleted'});
    }

    async disableCategory(req: Request, res: Response){
        const { slug } = req.params;
        const _category = await categoryApplication.disableCategory(slug);
        if(!_category){
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json({message: 'Category disabled'});
    }
}