import { BaseEntity } from "@core/infraestructure/base-entity";
import { ProductEntity } from "@products/infraestructure/model/product.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true})
    category_name: string;

    @Column({ type: 'varchar', length: 200, nullable: true})
    description: string;

    @Column({ type: 'boolean', default: true, nullable: false})
    active: boolean;

    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[]
}