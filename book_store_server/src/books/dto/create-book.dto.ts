import { Category } from "src/categories/entities/category.entity";

export class CreateBookDto {
    title: string;
    author: string;
    description: string;
    price: number;
    categories: Category[]
}
