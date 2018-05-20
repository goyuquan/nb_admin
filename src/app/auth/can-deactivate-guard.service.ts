import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

// import { CenterDetail } from '../center/center-detail';

export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  // canDeactivate(
  //   component: CenterDetail,
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | boolean {
  //   // Get the Crisis Center ID
  //   console.log(route.paramMap.get('id'));
  //
  //   // Get the current URL
  //   console.log(state.url);
  //
  //   // Allow synchronous navigation (`true`) if no center or the center is unchanged
  //   if (!component.center || component.center.name === component.editName) {
  //     return true;
  //   }
  //   // Otherwise ask the user with the dialog service and return its
  //   // observable which resolves to true or false when the user decides
  //   return component.dialogService.confirm('Discard changes?');
  // }
}
