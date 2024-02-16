import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { ProductEntity } from '@products/infraestructure/model/product.entity';
import { BaseEntity } from '@core/infraestructure/base-entity';
import { getSlug } from '@core/services/generateSlug';

@Entity('sales_products')
export class Sales_Products extends BaseEntity {
    @PrimaryColumn('uuid')
    @ManyToOne(() => SaleEntity, (sale) => sale.id)
    @JoinColumn({ name: 'saleId' })
    saleId: string;

    @PrimaryColumn('uuid')
    @ManyToOne(() => ProductEntity, (product) => product.id)
    @JoinColumn({ name: 'productId' })
    productId: string;

    @Column({ type: 'float', nullable: false })
    quantity: number;

    @Column({ type: 'float', nullable: false })
    mount: number;

    constructor(){
        super();
        this.slug = getSlug();
    }
}
