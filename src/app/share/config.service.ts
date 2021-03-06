import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    nav = [ //导航菜单
        {name: 'dashboard', url: 'dashboard', active: false},
        {name: 'user', url: 'user', active: false},
        {name: 'order', url: 'order', active: false},
        {name: 'product', url: 'product', active: false},
        {name: 'center', url: 'center', active: false},
        {name: 'table', url: 'table', active: false},
    ];
    settingNav = [
        {name: '字段选项', url: '/setting', active: false},
    ]
    pageSize: number = 20;
    pageSizeOptions: number[] = [ 10, 20, 50, 100, 200, 500 ];
    unAuthenticatedPages = [ '/login' ];

    options = [] //数据字典
}
