import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const catEntity = this.catRepository.create(createCatDto);
    return this.catRepository.save(catEntity);
  }

  async findAll(
    id: number,
    name: string,
    age: number,
    breed: string,
  ): Promise<Cat[]> {
    const data = await this.catRepository
      .createQueryBuilder('cats')
      .leftJoinAndSelect('cats.owner', 'owner')
      .where(id ? 'cats.id = :id' : '1=1', { id: id })
      .andWhere(name ? 'cats.name LIKE :name' : '1=1', {
        name: `%${name}%`,
      })
      .andWhere(age ? 'cats.age = :age' : '1=1', { age: age })
      .andWhere(breed ? 'cats.breed LIKE :breed' : '1=1', {
        breed: `%${breed}%`,
      })
      .getMany();
    return data;
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catRepository.findOneBy({ id });
  }

  update(id: number, updateCatDto: any) {
    return this.catRepository.update(id, updateCatDto);
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }

  async clearOwner(id: number): Promise<any> {
    await this.catRepository
      .createQueryBuilder()
      .relation(Cat, 'owner')
      .of(id)
      .set(null);
    return {
      status: 'success',
      message: 'owner of this cat has been removed',
    };
  }

  // create(createCat: Cat) {
  //   const lastItem = this.cats[this.cats.length - 1];
  //   const index = lastItem.id;
  //   if (createCat.name == undefined && createCat.age == undefined) {
  //     throw new Error("Error Your Object Key match with Cat's Key");
  //   }
  //   if (
  //     this.cats.filter(
  //       (i: Cat) =>
  //         i.name == createCat.name &&
  //         i.id == createCat.id &&
  //         i.age == createCat.age,
  //     ).length > 0
  //   ) {
  //     throw new Error('You already have this cat');
  //   }
  //   if (createCat.id == undefined) {
  //     createCat = {
  //       id: index + 1,
  //       ...createCat,
  //     };
  //   }
  //   this.cats.push(createCat);
  //   return `This action adds a new cat that is ${createCat.name}`;
  // }

  // findAll() {
  //   if (this.cats.length == 0) {
  //     throw new NotFoundException('404 Not Found', {
  //       cause: new Error(),
  //       description: "You don't have any cat",
  //     });
  //   }
  //   return this.cats;
  // }

  // findAllWithQuery(query: Cat) {
  //   if (Object.keys(query).length == 2) {
  //     const match_filters = this.cats.filter(
  //       (i) => i.name == query.name && i.age == query.age,
  //     );
  //     return match_filters;
  //   }
  //   if (query.name) {
  //     const name_filters = this.cats.filter((i) => i.name == query.name);
  //     return name_filters;
  //   }
  //   if (query.age) {
  //     const age_filters = this.cats.filter((i) => i.age == query.age);
  //     return age_filters;
  //   }
  // }

  // findOne(id: number) {
  //   const findOne = this.cats.filter((i) => i.id == id);
  //   return findOne;
  // }

  // update(id: number, updateCatDto: UpdateCatDto) {
  //   let catWithUpdateID = this.cats[id - 1];
  //   if (catWithUpdateID) {
  //     const updatedCat: Cat = {
  //       id: catWithUpdateID.id,
  //       name: updateCatDto.name ?? catWithUpdateID.name,
  //       age: updateCatDto.age ?? catWithUpdateID.age,
  //     };
  //     catWithUpdateID = updatedCat;
  //     return { status: 'Success', data: catWithUpdateID };
  //   }
  //   return `Cannot update the value`;
  // }

  // remove(id: number) {
  //   this.cats = this.cats.filter((i) => i.id !== id);
  //   return { status: 'Success', data: this.cats };
  // }
}
