import { Injectable } from '@angular/core';
import { HttpHandler, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { HttpService } from '../share/http.service';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private HttpService: HttpService,
  ) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.getToken() ? true : false;
  }

  login(url, param): Observable<any> {
    return this.http.get( url, { params: param });
  }

  logout(url): Observable<any> {
    return this.http.get( url );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(param): void {
    if (param) {
        localStorage.setItem('token', param);
    } else {
        localStorage.removeItem('token');
    }
  }

  updateToken(): Observable<string> {
    const BASE_URL = 'localhost';
    let refreshAuth = this.getToken(); //get refresh token from storage
    let url: string = BASE_URL + "auth/token/update"; //TODO 要增加的api
    return this.http.get(url, {
      headers: new HttpHeaders().set('updateAuthorization', refreshAuth),
      observe: 'response'
    }).map(res => {
      let authToken: string = res.headers.get('authorizationToken');
      // let refreshToken: string = res.headers.get('refreshToken'); //TODO 预留字段
      this.setToken(authToken);
      return authToken;
    });
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('userinfo'));
  }

}
