

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class SettingModel {
    constructor( public id: number, public name: string ) {}
}

let ORDERS = [
    new SettingModel(11, 'Mr. Nice'),
    new SettingModel(12, 'Narco'),
    new SettingModel(13, 'Bombasto'),
    new SettingModel(14, 'Celeritas'),
    new SettingModel(15, 'Magneta'),
    new SettingModel(16, 'RubberMan')
];

let settingsPromise = Promise.resolve(ORDERS);

@Injectable()
export class SettingService {

    constructor( private http: HttpClient ) {}

    getSetting(id: number | string) {
        return settingsPromise
        // (+) before `id` turns the string into a number
        .then(settings => settings.find(setting => setting.id === +id));
    }
}
