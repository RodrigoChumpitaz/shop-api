import { SalesRepository } from '@sale/domain/sales.repository';
import { DatabaseBootstrap } from '@server/database.bootstrap';
import { SaleEntity } from './model/sale.entity';
import { ISaleInsert } from '@sale/sales.dto';
import { generateSaleCode } from '@core/services/generateCode';
import { Sales_Products } from './model/sales_products.entity';
import { roundedNumber } from '@core/services/roundedNumber';
import { SaleModelDto } from './dto/sale-model-dto';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export class SaleInfraestructure implements SalesRepository {
    async registerSale(sale: ISaleInsert): Promise<any> {
        try {
            const transactionEntityManager =
                DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(
                async (transactionEntityManager) => {
                    const saleRepository =
                        transactionEntityManager.getRepository(SaleEntity);
                    const salesProductsRepository =
                        transactionEntityManager.getRepository(Sales_Products);
                    const salesCount = await saleRepository.count();

                    var newSale = saleRepository.create(sale);
                    newSale.saleCode = generateSaleCode(salesCount + 1);

                    const saleSaved = await saleRepository.save(newSale);

                    const salesProductsPromises = sale.sales_products.map(
                        async (saleDetail) => {
                            let mount = saleDetail.mount;
                            newSale.subTotal += roundedNumber(mount, 2);
                            newSale.total += roundedNumber(
                                mount - newSale.discount,
                                2
                            );
                            const salesProducts =
                                salesProductsRepository.create({
                                    saleId: saleSaved.id,
                                    productId: saleDetail.productId,
                                    quantity: saleDetail.quantity,
                                    mount: saleDetail.mount
                                });
                            await saleRepository.save(newSale);
                            await salesProductsRepository.save(salesProducts);
                        }
                    );
                    await Promise.all(salesProductsPromises);
                    return SaleModelDto.fromDataToApplication(
                        (await saleRepository
                            .createQueryBuilder('sales')
                            .leftJoinAndSelect('sales.sales_products', 'sp')
                            .leftJoinAndSelect('sp.productId', 'p')
                            .where('sales.id = :id', { id: saleSaved.id })
                            .getOne()) as SaleEntity
                    );
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async getAllSales(): Promise<any> {
        try {
            const transactionEntityManager = DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(async (transactionEntityManager) => {
                const saleRepository = transactionEntityManager.getRepository(SaleEntity);
                const allSalesDb = await saleRepository.find({
                    relations: ['sales_products', 'sales_products.productId'],
                    order: {
                        createdAt: 'DESC'
                    }
                });
                return SaleModelDto.fromDataToApplicationList(allSalesDb);
            })
        } catch (error) {
            return new Error(error.message);
        }
    }

    async getSalesByPage(page: number, pageSize: number): Promise<any | Error> {
        try {
            const transactionEntityManager = DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(async (transactionEntityManager) => {
                const saleRepository = transactionEntityManager.getRepository(SaleEntity);    
                const [sales, count] = await saleRepository.findAndCount({
                    skip: page * pageSize,
                    take: pageSize,
                    relations: ['sales_products', 'sales_products.productId'],
                    order: {
                        createdAt: 'DESC'
                    }
                });
                return SaleModelDto.fromDataToApplicationPage(sales, count);
            })
        } catch (error) {
            return new Error(error.message);
        }
    }
    async getSaleBySlug(slug: string): Promise<any> {
        try {
            const transactionEntityManager = DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(async (transactionEntityManager) => {
                const saleRepository = transactionEntityManager.getRepository(SaleEntity);
                const saleBySlug = await saleRepository.findOne({
                    where: { slug },
                    relations: ['sales_products', 'sales_products.productId'],
                }) as SaleEntity;
                return SaleModelDto.fromDataToApplication(saleBySlug);
            })
        } catch (error) {
            return new Error(error.message);   
        }
    }
    async getSalesByDate(initDate: Date, endDate: Date): Promise<any> {
        try {
            const transactionEntityManager = DatabaseBootstrap.AppDataSource.createEntityManager();
            return await transactionEntityManager.transaction(async (transactionEntityManager) => {
                const saleRepository = transactionEntityManager.getRepository(SaleEntity);
                const salesByDate = await saleRepository.find({
                    where: [
                        {
                            createdAt: MoreThanOrEqual(initDate),
                        },
                        {
                            createdAt: LessThanOrEqual(endDate),
                        }
                    ],
                    relations: ['sales_products', 'sales_products.productId'],
                    order: {
                        createdAt: 'DESC'
                    }
                });
                return SaleModelDto.fromDataToApplicationList(salesByDate);
            })
        } catch (error) {
            return new Error(error.message);
        }
    }
}
