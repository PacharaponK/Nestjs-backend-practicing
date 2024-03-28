import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
    ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(createUser);
  }

  async findAll() {
    const listAllUsers = await this.usersRepository.find({relations : ['profile','books']})
    return listAllUsers
  }

  async findOne(id: number): Promise<User> {
    const specificUser = await this.usersRepository.findOne({
      relations : ['profile','books'],
      where: {id: id}
    })
    return specificUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  
  async remove(id: number): Promise<any> {
    const onRemoveUser = await this.findOne(id);
    if (onRemoveUser.books?.length > 0) {
      await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'books')
        .of(id)
        .remove(onRemoveUser.books.map((books) => books.id));
    }
    if (onRemoveUser.profile) {
      await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'profile')
        .of(id)
        .remove(onRemoveUser.profile.id);
    }
    await this.usersRepository.delete(id);
    return { status: 'Success', deleted: onRemoveUser };
  }
}
