export interface SalesRepository {
    registerSale(sale: any): Promise<any>;
    getAllSales(): Promise<any>;
    getSalesByPage(page: number, pageSize: number): Promise<any[] | Error>;
    getSaleBySlug(slug: string): Promise<any>;
    getSalesByDate(initDate: Date, endDate: Date): Promise<any>;
}
