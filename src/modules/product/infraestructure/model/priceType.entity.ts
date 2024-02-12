import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity("priceType")
export class PriceTypeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    priceType: string;

    @OneToMany(() => ProductEntity, product => product.priceType)
    products: ProductEntity[]
}