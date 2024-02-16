import { Column } from "typeorm";

export class BaseEntity{
    @Column({ type: 'char', length: 11, nullable: false, unique: true })
    slug: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    updatedAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    disabledAt!: Date;
}