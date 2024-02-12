import { ProductRepository } from "@products/domain/product.repository";

export class ProductApplication{
    constructor(private productRepository: ProductRepository){}

    async getAllProducts(){
        return await this.productRepository.getAllProducts();
    }

    async getByPage(page: number, pageSize: number){
        return await this.productRepository.getByPage(page, pageSize);
    }

    async getProductBySlug(slug: string){
        return await this.productRepository.getProductBySlug(slug);
    }

    async createProduct(product: any): Promise<any>{
        return await this.productRepository.createProduct(product);
    }

    async updateProduct(slug: string, product: any): Promise<any>{
        return await this.productRepository.updateProduct(slug, product);
    }

    async deleteProduct(slug: string): Promise<any>{
        return await this.productRepository.deleteProduct(slug);
    }
}