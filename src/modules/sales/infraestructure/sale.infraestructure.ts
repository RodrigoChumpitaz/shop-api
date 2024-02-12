import { SalesRepository } from '@sale/domain/sales.repository';
import { DatabaseBootstrap } from '@server/database.bootstrap';
import { SaleEntity } from './model/sale.entity';
import { ISaleInsert } from '@sale/sales.dto';

export class SaleInfraestructure implements SalesRepository {
    async registerSale(sale: ISaleInsert): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(SaleEntity);
            const _sale = dbRepository.create(sale);
            console.log(_sale)
            return _sale;
        } catch (error) {
            return new Error(error.message)
        }
    }
    async getAllSales(): Promise<any> {
        try {
            const dbRepository = DatabaseBootstrap.AppDataSource.getRepository(SaleEntity);
            const allSalesDb = await dbRepository.find({
                relations: ["sales_products"]
            })
            return allSalesDb;
        } catch (error) {
            return new Error(error.message)
        }
    }
    getSalesByPage(page: number, pageSize: number): Promise<any[] | Error> {
        throw new Error('Method not implemented.');
    }
    getSaleBySlug(slug: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getSalesByDate(initDate: Date, endDate: Date): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
