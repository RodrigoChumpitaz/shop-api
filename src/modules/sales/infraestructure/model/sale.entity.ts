import { BaseEntity } from "@core/infraestructure.ts/base-entity";
import { ProductEntity } from "@products/infraestructure/model/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sales_Products } from "./sales_products.entity";

@Entity("sales") 
export class SaleEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'varchar' })
    saleCode: string

    @Column({ type: 'float', default: 0 })
    subTotal: number

    @Column({ type: 'float', default: 0 })
    total: number

    @Column({ type: 'float', default: 0 })
    discount: number

    // @ManyToMany(() => ProductEntity, product => product.sales, { eager: true })
    // @JoinTable({
    //     name: 'sales_products',
    //     joinColumn: {
    //         name: 'saleId',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'productId',
    //         referencedColumnName: 'id'
    //     }
    // })
    // products: ProductEntity[]

    @OneToMany(() => Sales_Products, sales => sales.saleId)
    sales_products: Sales_Products[]
}