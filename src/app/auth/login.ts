import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthModel { phone: string; password: string; }

@Component({
  templateUrl: './login.html',
  styleUrls: ['./auth.scss'],
})
export class Login {
  forms: AuthModel = { phone: '', password: '' };

  constructor( public authService: AuthService, public router: Router ) { }

  login() {
    this.authService.login('/api/auth/login', this.forms).subscribe(res => {
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
      localStorage.setItem('userinfo', JSON.stringify(res.data)); //本地存储用户信息
      this.authService.checkLoginStatus();
      this.router.navigate([redirect]); //登录成功后重定向
    });
  }
}
