import { Component, ViewChild, Input, Output} from '@angular/core';
import { HttpService } from './share/http.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service'

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

  constructor (
    private httpService: HttpService,
    private authService: AuthService,
    public router: Router
  ) {
    this.sidenavVisible = this.isLogin ? true : false;
    this.links = [
     {name: 'dashboard', url: 'dashboard', active: false},
     {name: 'center', url: 'center', active: false},
     {name: 'super-order', url: 'order', active: false},
     {name: 'table', url: 'table', active: false},
     {name: 'NotFound', url: 'four', active: false},
   ];
  }

  ngDoCheck() {
    this.httpLoading = this.httpService.loading;
    this.isLogin = this.authService.isLoggedIn;
  }

  sidenavToggle() {
    this.sidenavVisible = !this.sidenavVisible;
  }

  logout() {
    this.userinfo = this.authService.getUserInfo();  //获取用户信息
    this.authService.logout('/api/user/logout/' + this.userinfo.id).subscribe(res => {
      this.authService.removeToken();
      this.authService.checkLoginStatus();
      this.router.navigate(['/login']); //退出成功后重定向
    });
  }

}
