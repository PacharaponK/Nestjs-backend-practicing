import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Controller("cat")
export class CatController {
    constructor(private readonly catsService: CatsService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.catsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(+id, updateCatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
    }

    @Delete(':catId/clearOwner') 
    clearOwner(@Param('catId') catId: string) {
        return this.catsService.clearOwner(+catId);
    }
    
}