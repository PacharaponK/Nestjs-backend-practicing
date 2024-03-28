import { Injectable } from "@nestjs/common";

@Injectable()
export class plusService{
    plus(a:number, b:number) {
        return a+b
    }
}