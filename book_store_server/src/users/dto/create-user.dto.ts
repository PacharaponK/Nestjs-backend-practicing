import { Profile } from "src/profiles/entities/profile.entity";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    bio: string;
    address: string;
    profile: Profile;
}
