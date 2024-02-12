import { Request, Response } from 'express';
import { ProductInfraestructure } from './infraestructure/product.infraestructure';
import { ProductApplication } from './application/product.application';
import { ProductFactory } from './domain/product.factory';

const productInfra = new ProductInfraestructure();
const productApplication = new ProductApplication(productInfra);

export class ProductController {
    constructor() {
        this.createProduct = this.createProduct.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductBySlug = this.getProductBySlug.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getByPage = this.getByPage.bind(this);
    }

    async getAllProducts(req: Request, res: Response) {
        const _products = await productApplication.getAllProducts();
        if (_products instanceof Error) {
            return res.status(400).json({ message: _products.message });
        }
        return res.status(200).json(_products);
    }

    async getByPage(req: Request, res: Response) {
        const { page, pageSize } = req.params;
        const _products = await productApplication.getByPage(
            Number(page),
            Number(pageSize)
        );
        if (_products instanceof Error) {
            return res.status(400).json({ message: _products.message });
        }
        return res.status(200).json(_products);
    }

    async getProductBySlug(req: Request, res: Response) {
        const { slug } = req.params;
        const _product = await productApplication.getProductBySlug(slug);
        if (_product instanceof Error) {
            return res.status(400).json({ message: _product.message });
        }
        return res.status(200).json(_product);
    }

    async createProduct(req: Request, res: Response) {
        const {
            productName,
            price,
            weight,
            category,
            priceType,
            description,
            owners,
            img
        } = req.body;
        const _product = ProductFactory.createProduct({
            productName,
            price,
            weight,
            category,
            priceType,
            description,
            owners,
            img
        });
        const productSave = await productApplication.createProduct(_product);
        if (productSave instanceof Error) {
            return res.status(400).json({ message: productSave.message });
        }
        return res.status(201).json(productSave);
    }

    async updateProduct(req: Request, res: Response) {
        const { slug } = req.params;
        const {
            productName,
            price,
            weight,
            category,
            priceType,
            description,
            owners,
            img
        } = req.body;
        const _product = ProductFactory.createProduct({
            productName,
            price,
            weight,
            category,
            priceType,
            description,
            owners,
            img
        });
        const productSave = await productApplication.updateProduct(
            slug,
            _product
        );
        if (productSave instanceof Error) {
            return res.status(400).json({ message: productSave.message });
        }
        return res.status(201).json(productSave);
    }

    async deleteProduct(req: Request, res: Response) {
        const { slug } = req.params;
        const productSave = await productApplication.deleteProduct(slug);
        if (productSave instanceof Error) {
            return res.status(400).json({ message: productSave.message });
        }
        return res.status(201).json({
            message: 'Product deleted successfully'
        });
    }
}
