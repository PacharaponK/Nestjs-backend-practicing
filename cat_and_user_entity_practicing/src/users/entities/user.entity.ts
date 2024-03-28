import { Exclude, Expose } from "class-transformer";
import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserGender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({nullable: false})
    firstName: string;

    @Column()
    lastName: string;

    @Expose({ groups: ['secure']})
    @Column()
    password: string;

    @Column({unique: true})
    identityId: string;

    @Expose({ groups: ['detail']})
    @Column({default: "undefined"})
    bio: string;

    @Expose({ groups: ['detail']})
    @Column({default: "undefined"})
    address: string;

    @Column()
    age: number;

    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.OTHER
    })
    gender: UserGender;

    @OneToMany(() => Cat, (cat) => cat.owner, {cascade: true})
    cats: Cat[];


}
