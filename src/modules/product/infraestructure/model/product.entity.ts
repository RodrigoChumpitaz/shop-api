import { BaseEntity } from "@core/infraestructure/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceTypeEntity } from "./priceType.entity";
import { CategoryEntity } from "@category/infraestructure/model/category.entity";
import { SaleEntity } from "@sale/infraestructure/model/sale.entity";
import { Sales_Products } from "@sale/infraestructure/model/sales_products.entity";

@Entity("products")
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    product_name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    description: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    weight: number;
    
    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category' })
    category: string;

    @ManyToOne(() => PriceTypeEntity, priceType => priceType.products)
    @JoinColumn({ name: 'priceType' })
    priceType: number;

    @Column({ type: 'simple-array', nullable: true })
    owners: string[];

    @Column({ type: 'boolean', default: true, nullable: false })
    active: boolean;

    @Column({ type: 'varchar', length: 150, nullable: false, default: 'image.webp' })
    img: string;

    // @ManyToMany(() => SaleEntity, sale => sale.products)
    // sales: SaleEntity[]

    @OneToMany(() => Sales_Products, sales => sales.productId)
    sales_products: Sales_Products[]
}