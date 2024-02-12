import { ProductRepository } from '@products/domain/product.repository';
import { DatabaseBootstrap } from '@server/database.bootstrap';
import { ProductEntity } from './model/product.entity';
import { ProductInsert } from '@core/types/_product';
import { ProductModelDto } from './dto/product-model.dto';

export class ProductInfraestructure implements ProductRepository {
    async getByPage(page: number, pageSize: number): Promise<any | Error> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            const [ products, count ] = await dbRepository.findAndCount({
                skip: page * pageSize,
                take: pageSize,
                where: { active: true },
                relations: ['category', 'priceType']
            });
            return ProductModelDto.fromDataToApplicationPaging(products, count);
        } catch (error) {
            return new Error(error);
        }
    }
    async createProduct(product: ProductInsert): Promise<any> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            const newProduct = dbRepository.create(product);
            // await dbRepository.save(newProduct);
            return ProductModelDto.fromDataToApplicationOne(newProduct);
        } catch (error) {
            return new Error(error);
        }
    }
    async updateProduct(slug: string, product: any): Promise<any> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            const productBySlug = await dbRepository.exists({
                where: { slug }
            });
            if (!productBySlug) throw new Error('Product not found');
            await dbRepository
                .createQueryBuilder()
                .update(ProductEntity)
                .set({
                    category: product.category,
                    description: product.description,
                    img: product.img,
                    owners: product.owners,
                    price: product.price,
                    priceType: product.priceType,
                    product_name: product.product_name,
                    weight: product.weight
                })
                .where('slug = :slug', { slug })
                .execute();
            return {
                message: 'Product updated successfully',
                product: product
            };
        } catch (error) {
            return new Error(error);
        }
    }
    async deleteProduct(slug: string): Promise<any> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            await dbRepository.delete({ slug });
            return true;
        } catch (error) {
            return new Error(error);
        }
    }
    async getProductBySlug(slug: string): Promise<any> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            const product = await dbRepository.findOne({
                where: { slug },
                relations: ['category', 'priceType']
            });
            if (product === null) throw new Error('Product not found');
            return ProductModelDto.fromDataToApplicationOne(product);
        } catch (error) {
            return new Error(error);
        }
    }
    async getAllProducts(): Promise<any> {
        try {
            const dbRepository =
                DatabaseBootstrap.AppDataSource.getRepository(ProductEntity);
            const products = await dbRepository
                .createQueryBuilder('products')
                .leftJoinAndSelect('products.category', 'category_name')
                .leftJoinAndSelect('products.priceType', 'priceType')
                .where('products.active = :active', { active: true })
                .orderBy('products.product_name', 'ASC')
                .getMany();
            return ProductModelDto.fromDataToApplication(products);
        } catch (error) {
            return new Error(error);
        }
    }
}
