import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({default: "not specified"})
    description: string;

    @Column()
    price: number;

    @ManyToMany(() => Category, {cascade: true})
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => User,(user) => user.books)
    owner: User;
}
