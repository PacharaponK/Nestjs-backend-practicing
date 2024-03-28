import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Put, Query, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Delete(':userId/removeCat/:catId') 
    removeCat(@Param('userId') userId: string, @Param('catId') catId:string) {
        return this.usersService.removeCat(+userId, +catId);
    }

    @Delete(':userId/clearCat') 
    clearCat(@Param('userId') userId: string) {
        return this.usersService.clearCat(+userId);
    }
}