import { Body, Controller, Get } from '@nestjs/common';
import { plusService } from './plus.service';

@Controller()
export class plusController{
    constructor(private PlusService:plusService) {}

    @Get("/plus")
    add(@Body() object:any):any {
        console.log(object);
        return {result : this.PlusService.plus(object.a,object.b)}
    }

}
