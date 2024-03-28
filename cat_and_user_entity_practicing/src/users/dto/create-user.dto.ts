import { Cat } from "src/cats/entities/cat.entity";
import { UserGender } from "../entities/user.entity";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    identityId: string;
    gender: UserGender;
    age: number;
    cats? : Cat[];
}
