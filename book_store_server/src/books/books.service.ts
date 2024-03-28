import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(createBook);
  }

  findAll() {
    const listAllBook = this.bookRepository.find({
      relations: ['categories','owner'],
    });
    return listAllBook;
  }

  findOne(id: number) {
    const specificBook = this.bookRepository.findOne({
      where: {
        id: id,
      },
      relations: ['categories','owner'],
    });
    return specificBook;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const thisBook = await this.findOne(id)
    
    const updateBook = this.bookRepository.update(id,{
      title: updateBookDto.title ?? thisBook.title,
      author: updateBookDto.author ?? thisBook.author,
      price: updateBookDto.price ?? thisBook.price,
      description: updateBookDto.description ?? thisBook.description,
    });
    thisBook.categories = [...updateBookDto.categories];
    await this.bookRepository.save(thisBook);
    return updateBook
  }

  async remove(id: number): Promise<any> {
    const relatedCat = await this.findOne(id);
    if (relatedCat.categories?.length > 0) {
      await this.bookRepository
        .createQueryBuilder()
        .relation(Book, 'categories')
        .of(id)
        .remove(relatedCat.categories.map((categories) => categories.id));
    }
    await this.bookRepository.delete(id);
    return { status: 'Success', deleted: relatedCat };
  }
}
