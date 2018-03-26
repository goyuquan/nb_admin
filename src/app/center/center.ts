import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { slideInDownAnimation } from '../animations';

@Component({
  template: `
    <h1>centers</h1>
    <hr>
    <router-outlet></router-outlet>
  `,
  animations: [ slideInDownAnimation ]
})
export class Center {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
}
