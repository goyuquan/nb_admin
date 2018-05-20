
import {filter} from 'rxjs/operators';
import { Component, ViewChild, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from './share/http.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';


import { AuthService } from './auth/auth.service'
import { ConfigService } from './share/config.service'

export class UserModel { id: number }

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App {

    httpLoading: boolean;
    isLogin: boolean = true;
    sidenavVisible: boolean;
    userinfo: UserModel;
    links: any[];
    settingLinks: any[];
    previousUrl: string;
    backAvailable: boolean;

    constructor (
        private httpService: HttpService,
        private authService: AuthService,
        public configService: ConfigService,
        private location: Location,
        public router: Router
    ) {
        this.sidenavVisible = this.isLogin ? true : false;
        this.links = this.configService.nav;
        this.settingLinks = this.configService.settingNav;

        this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(e => {
            if (this.configService.unAuthenticatedPages.indexOf(this.previousUrl) === -1) {
                this.backAvailable = true;
            } else {
                this.backAvailable = false;
            }
            this.previousUrl = e['url'];
        });
    }

    ngDoCheck() {
        this.httpLoading = this.httpService.loading;
        this.isLogin = this.authService.isLoggedIn;
    }

    sidenavToggle() {
        this.sidenavVisible = !this.sidenavVisible;
    }

    back() {
        this.location.back()
    }

    logout() {
        this.userinfo = this.authService.getUserInfo();  //获取用户信息
        this.authService
        .logout('/api/auth/logout/' + this.userinfo.id)
        .subscribe(res => {
            this.authService.removeToken();
            this.authService.checkLoginStatus();
            this.router.navigate(['/login']); //退出成功后重定向
        });
    }
}
