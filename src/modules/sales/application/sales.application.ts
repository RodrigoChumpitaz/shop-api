import { SalesRepository } from '@sale/domain/sales.repository';

export class SalesApplication {
    constructor(private salesRespository: SalesRepository) {}

    async getAllSales(): Promise<any> {
        return await this.salesRespository.getAllSales();
    }

    async registerSale(sale: any): Promise<any> {
        return await this.salesRespository.registerSale(sale);
    }
}
