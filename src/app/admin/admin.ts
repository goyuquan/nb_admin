
import { Component } from '@angular/core';

@Component({
  template:  `
    <h2>ADMIN</h2>
    <hr>
    <nav>
      <a routerLink="./" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      <a routerLink="./center" routerLinkActive="active">Manage center</a>
      <a routerLink="./order" routerLinkActive="active">Manage order</a>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `
})
export class Admin {
}
