import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Book } from './books/entities/book.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: '1234',
    database: 'book_store',
    entities: [User, Profile, Book, Category],
    synchronize: true,
  }),UsersModule, BooksModule, CategoriesModule, ProfilesModule],
})
export class AppModule {}
