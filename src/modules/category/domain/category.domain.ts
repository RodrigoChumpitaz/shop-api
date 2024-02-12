import { getSlug } from "@core/services/generateSlug";

export interface CategoryOptionals{
    readonly id: string;
    readonly description: string
    readonly active: boolean;
    readonly slug: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly disabledAt: Date;
}

export class CategoryRequired{
    readonly category_name: string;
}

export type CategoryProperties = Partial<CategoryOptionals> & CategoryRequired;

export class Category{
    id: string;
    category_name: string;
    description: string;
    active: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    disabledAt: Date;

    constructor(properties: CategoryProperties) {
        this.active = true;
        this.slug = getSlug();
        Object.assign(this, properties);
    }

    get properties(): CategoryProperties{
        return {
            id: this.id,
            category_name: this.category_name,
            description: this.description,
            active: this.active,
            slug: this.slug,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            disabledAt: this.disabledAt
        }
    }
}