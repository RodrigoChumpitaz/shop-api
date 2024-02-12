export interface ProductRepository {
    createProduct(product: any): Promise<void>;
    updateProduct(slug: string, product: any): Promise<void>;
    deleteProduct(slug: string): Promise<void>;
    getProductBySlug(slug: string): Promise<any>;
    getAllProducts(): Promise<any[]>;
    getByPage(page: number, pageSize: number): Promise<any[] | Error>;
}
