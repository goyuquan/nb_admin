import { Component, HostBinding } from '@angular/core';
import { slideInDownAnimation } from './animations';

@Component({
  template: '<h2>Page not found</h2>',
  animations: [ slideInDownAnimation ]
})
export class NotFound {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
}
