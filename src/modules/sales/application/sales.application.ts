import { SalesRepository } from '@sale/domain/sales.repository';

export class SalesApplication {
    constructor(private salesRespository: SalesRepository) {}

    async getAllSales(): Promise<any> {
        return await this.salesRespository.getAllSales();
    }

    async registerSale(sale: any): Promise<any> {
        return await this.salesRespository.registerSale(sale);
    }

    async getByPage(page: number, pageSize: number): Promise<any> {
        return await this.salesRespository.getSalesByPage(page, pageSize);
    }

    async getSaleBySlug(slug: string): Promise<any> {
        return await this.salesRespository.getSaleBySlug(slug);
    }

    async getSalesByDate(initDate: Date, endDate: Date): Promise<any> {
        return await this.salesRespository.getSalesByDate(initDate, endDate);
    }
}
