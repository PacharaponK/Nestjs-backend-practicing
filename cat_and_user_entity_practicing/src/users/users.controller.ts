import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({groups: ['secure']})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(
      query.id,
      query.firstName,
      query.lastName,
      query.identityId,
      query.age,
      query.gender,
    );
  }

  @Get('/getAverage')
  findAverageGenders() {
    return this.usersService.getAverage();
  }

  @Put('/playground')
  playground() {
    return this.usersService.playground();
  }

  @Get('/notHaveCat') 
  notHaveCat() {
    return this.usersService.notHaveCat();
  }
}
