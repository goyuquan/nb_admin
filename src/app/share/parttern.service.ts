import { Injectable } from '@angular/core';

@Injectable()
export class PatternService {
    price: RegExp = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
}
