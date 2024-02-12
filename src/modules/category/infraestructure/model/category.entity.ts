import { BaseEntity } from "@core/infraestructure.ts/base-entity";
import { ProductEntity } from "@products/infraestructure/model/product.entity";
import { Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'nvarchar', length: 150, nullable: false, unique: true})
    category_name: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true})
    description: string;

    @Column({ type: 'boolean', default: true, nullable: false})
    active: boolean;

    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[]
}