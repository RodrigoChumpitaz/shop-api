import { Request, Response } from "express";
import { SalesApplication } from "./application/sales.application";
import { SaleInfraestructure } from "./infraestructure/sale.infraestructure";
import { ISaleInsert } from "./sales.dto";

const saleInfreaestructure = new SaleInfraestructure();
const saleApplication = new SalesApplication(saleInfreaestructure);

export class SalesController{
    constructor(){
        this.getAllSales = this.getAllSales.bind(this);
    }

    async getAllSales(req: Request, res: Response){
        const _allSales = await saleApplication.getAllSales();
        return res.status(200).json(_allSales);
    }

    async registerSale(req: Request, res: Response){
        const { subTotal, total, salesDetail }: ISaleInsert = req.body;
        const _newSale = await saleApplication.registerSale({ subTotal, total, salesDetail });
        return res.status(201).json(_newSale);
    }
}