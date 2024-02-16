import express, { Application } from 'express';
import morgan from 'morgan';
import categoryRoutes from '@category/category.routes';
import productRoutes from '@products/product.routes';
import salesRoutes from '@sale/sales.routes';
import cors from 'cors';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(morgan('combined'))
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
        }))
    }

    routes(){
        this.app.use('/api/v1/category', categoryRoutes);
        this.app.use('/api/v1/product', productRoutes)
        this.app.use('/api/v1/sale', salesRoutes)
    }
}

export default new App().app;
