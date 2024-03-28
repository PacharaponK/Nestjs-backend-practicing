import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Get()
    test(): string {
        return this.testService.test();
    }
}
