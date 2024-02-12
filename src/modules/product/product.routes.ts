import { Router } from 'express';
import { ProductController } from './product.controller';

class ProductRouter {
    router: Router;
    controller: ProductController;

    constructor() {
        this.router = Router();
        this.controller = new ProductController();
        this.routes();
    }

    routes() {
        this.router.get('/get', this.controller.getAllProducts);
        this.router.get('/get/:page/:pageSize', this.controller.getByPage);
        this.router.get('/get/:slug', this.controller.getProductBySlug);
        this.router.post('/create', this.controller.createProduct);
        this.router.patch('/update/:slug', this.controller.updateProduct);
        this.router.delete('/delete/:slug', this.controller.deleteProduct);
    }
}

export default new ProductRouter().router;
