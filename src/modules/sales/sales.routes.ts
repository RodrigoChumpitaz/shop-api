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
        this.router.post('/register', this.controller.registerSale);
    }
}

export default new SalesRoutes().router;
