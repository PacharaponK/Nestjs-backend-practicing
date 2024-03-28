import { Injectable } from '@nestjs/common';

@Injectable()
export class SumService {
    private sums:number = 0

    getSum(num:number): any {
        return {total : this.sums+=num};
    }
}