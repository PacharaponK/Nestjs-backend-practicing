import { Book } from "src/books/entities/book.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    MEMBER = "member",
    GUEST = "guest",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column()
    email: string;    

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole;

    @OneToMany(() => Book,(book) => book.owner,{cascade: true})
    books: Book[];

    @OneToOne(() => Profile,{cascade: true})
    @JoinColumn()
    profile: Profile;
}
