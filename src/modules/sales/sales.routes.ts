import { Router } from 'express';
import { SalesController } from './sales.controller';

class SalesRoutes {
    router: Router;
    controller: SalesController;

    constructor() {
        this.router = Router();
        this.controller = new SalesController();
        this.routes();
    }

    routes() {
        this.router.get('/get', this.controller.getAllSales);
        this.router.get('/get/:page/:pageSize', this.controller.getByPage);
        this.router.get('/get/:slug', this.controller.getSaleBySlug);
        this.router.get('/date', this.controller.getSalesByDate);
        this.router.post('/register', this.controller.registerSale);
    }
}

export default new SalesRoutes().router;
