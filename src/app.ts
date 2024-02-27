import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import categoryRoutes from '@category/category.routes';
import productRoutes from '@products/product.routes';
import salesRoutes from '@sale/sales.routes';
import cors from 'cors';
import { DatabaseBootstrap } from '@server/database.bootstrap';

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
        this.app.post('/post/infoData', async (req: Request, res: Response) => {
            try {
                const data = req.body;
                const db = new DatabaseBootstrap();
                const mongoConnection: typeof import("mongoose") = await db.initMongo();
                let result = await mongoConnection.connection.db.collection('shopifydata').insertOne(data)
                if(result.acknowledged){
                    if(await db.closeMongonConnection()) console.log('MongoDB connection closed')
                    return res.status(200).json({
                        message: 'Data saved successfully',
                        data: result
                    })
                }
                return res.status(400).json({
                    message: 'Data not saved'
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
        })
        this.app.use('/api/v1/category', categoryRoutes);
        this.app.use('/api/v1/product', productRoutes)
        this.app.use('/api/v1/sale', salesRoutes)
    }
}

export default new App().app;
