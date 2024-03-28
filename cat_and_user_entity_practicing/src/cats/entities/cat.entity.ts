import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    age: number;

    @Column({default: "no specific breed"})
    breed: string;

    @ManyToOne(() => User,(user) => user.cats)
    owner: User;
}
