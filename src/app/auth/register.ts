import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./auth.scss']
})
export class Register {
  message: string;

  constructor(public authService: AuthService, public router: Router) {}

  register() {
    this.message = 'Trying to log in ...';

    this.authService.login({
      email: '',
      password: ''
    }, () => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
  }
}
