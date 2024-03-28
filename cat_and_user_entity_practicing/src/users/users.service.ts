import { Injectable, Post, SerializeOptions } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = this.userRepository.create(createUserDto);
    // const userSave = await this.userRepository.save(userEntity);
    // console.log(createUserDto.cats);
    // if (createUserDto.cats) {
    //   console.log(createUserDto.cats);
    //   await this.userRepository
    //     .createQueryBuilder()
    //     .relation(User, 'cat')
    //     .of(userSave.id)
    //     .add(createUserDto.cats);
    // }
    return await this.userRepository.save(userEntity);
  }

  async findAll(
    id?: number,
    firstName?: string,
    lastName?: string,
    identityId?: string,
    age?: number,
    gender?: string,
  ): Promise<User[]> {
    const data = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.cats', 'cats')
      .where(id ? 'users.id = :id' : '1=1', { id: id })
      .andWhere(firstName ? 'users.firstName LIKE :firstName' : '1=1', {
        firstName: `%${firstName}%`,
      })
      .andWhere(lastName ? 'users.lastName LIKE :lastName' : '1=1', {
        lastName: `%${lastName}%`,
      })
      .andWhere(age ? 'users.age = :age' : '1=1', { age: age })
      .andWhere(gender ? 'users.gender = :gender' : '1=1', {
        gender: gender,
      })
      .andWhere(identityId ? 'users.identityId LIKE :identityId' : '1=1', {
        identityId: `%${identityId}%`,
      })
      .getMany();
    return data;
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: { cats: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.update(id, {
      firstName: updateUserDto.firstName ?? user.firstName,
      lastName: updateUserDto.lastName ?? user.lastName,
      identityId: updateUserDto.identityId ?? user.identityId,
      gender: updateUserDto.gender ?? user.gender,
      age: updateUserDto.age ?? user.age,
    });

    updateUserDto.cats.map((cat) =>
      this.userRepository
        .createQueryBuilder()
        .update(Cat)
        .set({
          owner: { id: user.id },
        })
        .where('id = :id', {
          id: cat.id,
        })
        .execute(),
    );
    return { status: 'Success', id: id, updated: updateUserDto };
  }

  async remove(id: number): Promise<any> {
    const relatedCat = await this.findOne(id);
    if (relatedCat.cats?.length > 0) {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'cats')
        .of(id)
        .remove(relatedCat.cats.map((cat) => cat.id));
    }
    await this.userRepository.delete(id);
    return { status: 'Success', deleted: relatedCat };
  }

  async playground(): Promise<any> {
    return await this.userRepository.sum('id');
  }

  async removeCat(id: number, catId: number): Promise<any> {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'cats')
      .of(id)
      .remove(catId);
    return { status: 'success', deleted_cat: catId, from_user: id };
  }

  async getAverage(): Promise<any> {
    const averageAge = this.userRepository
      .createQueryBuilder('user')
      .select('user.gender', 'gender')
      .addSelect('AVG(user.age)', 'average_age')
      .groupBy('user.gender')

    console.log("🚀 ~ UsersService ~ getAverage ~ averageAge:", averageAge.getQuery());
    
    return await averageAge.getRawMany();
  }

  async clearCat(id: number): Promise<any> {
    const relatedUser = await this.findOne(id);
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'cats')
      .of(id)
      .remove(relatedUser.cats.map((cat) => cat.id));
    return {
      status: 'success',
      deleted_cat: relatedUser.cats,
      from_user: {
        id: id,
        firstName: relatedUser.firstName,
        lastName: relatedUser.lastName,
        identityId: relatedUser.identityId,
        age: relatedUser.age,
        gender: relatedUser.gender,
      },
    };
  }

  async notHaveCat(): Promise<User[]> {
    let allUsers = await this.findAll();
    allUsers = allUsers.filter((i) => i.cats.length == 0);

    const noCat = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cats', 'cats')
      .where(`cats.id is null`)
      .getMany();
    

    return noCat;
  }


}
