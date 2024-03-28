import { Body, Controller, Get } from '@nestjs/common';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController {
    constructor(private readonly sumService: SumService) {}

    @Get()
    getSum(@Body("num") body:number): number {
        return this.sumService.getSum(body);
    }
}