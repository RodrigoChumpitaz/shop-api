import { Request, Response } from 'express';
import { SalesApplication } from './application/sales.application';
import { SaleInfraestructure } from './infraestructure/sale.infraestructure';
import { ISaleDateQuery, ISaleInsert } from './sales.dto';
import { SaleFactory } from './domain/sale.factory';
import { converToType } from '@core/helpers/mapper';
import { SalesProducts } from './infraestructure/model/sale_products';

const saleInfreaestructure = new SaleInfraestructure();
const saleApplication = new SalesApplication(saleInfreaestructure);

export class SalesController {
    constructor() {
        this.getAllSales = this.getAllSales.bind(this);
        this.registerSale = this.registerSale.bind(this);
        this.getByPage = this.getByPage.bind(this);
        this.getSaleBySlug = this.getSaleBySlug.bind(this);
        this.getSalesByDate = this.getSalesByDate.bind(this);
    }

    async getAllSales(req: Request, res: Response) {
        const _allSales = await saleApplication.getAllSales();
        return res.status(200).json(_allSales);
    }

    async getByPage(req: Request, res: Response) {
        const { page, pageSize } = req.params;
        const _allSales = await saleApplication.getByPage(
            Number(page),
            Number(pageSize)
        );
        return res.status(200).json(_allSales);
    }

    async getSaleBySlug(req: Request, res: Response) {
        const { slug } = req.params;
        const _sale = await saleApplication.getSaleBySlug(slug);

        if (_sale instanceof Error) {
            return res.status(404).json({ message: _sale.message });
        }

        return res.status(200).json(_sale);
    }

    async registerSale(req: Request, res: Response) {
        const { sales_products, discount }: ISaleInsert = req.body;
        const _sale = SaleFactory.registerSale({
            sales_products: converToType(sales_products, SalesProducts),
            discount
        });
        const _newSale = await saleApplication.registerSale(_sale);

        if (_newSale instanceof Error) {
            return res.status(400).json({ message: _newSale.message });
        }

        return res.status(201).json(_newSale);
    }

    async getSalesByDate(req: Request, res: Response) {
        const { initDate, endDate }: ISaleDateQuery =
            req.query as unknown as ISaleDateQuery;
        const _sales = await saleApplication.getSalesByDate(
            new Date(initDate),
            new Date(endDate)
        );
        if (_sales instanceof Error) {
            return res.status(404).json({ message: _sales.message });
        }
        return res.status(200).json(_sales);
    }
}
