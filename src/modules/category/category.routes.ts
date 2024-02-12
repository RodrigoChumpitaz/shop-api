import { Router } from "express";
import { CategoryController } from "./category.controller";

class CategoryRoute {
    router: Router;
    controller: CategoryController

    constructor(){
        this.router = Router();
        this.controller = new CategoryController();
        this.routes();
    }

    routes(){
        this.router.get('/get', this.controller.getCategories)
        this.router.get('/get/:slug', this.controller.getCategory)
        this.router.get('/get/:page/:pageSize', this.controller.getCategoryByPage)
        this.router.post('/create', this.controller.createCategory)
        this.router.patch('/update/:slug', this.controller.updateCategory)
        this.router.patch('/disable/:slug', this.controller.disableCategory)
        this.router.delete('/delete/:slug', this.controller.deleteCategory)
    }
}

export default new CategoryRoute().router;