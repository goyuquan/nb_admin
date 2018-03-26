import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { Observable } from 'rxjs/Observable';

import { DialogService }  from '../dialog.service';
import { Center } from './center.service';

@Component({
  selector: 'center-detail',
  templateUrl: './center-detail.html',
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})
export class CenterDetail implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    center: Center;
    editName: string = '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      public dialogService: DialogService
    ) {}

    ngOnInit() {
      this.route.data
        .subscribe((data: { center: Center }) => {
          this.editName = data.center.name;
          this.center = data.center;
        });
    }

    cancel() {
      this.gotoCenterlist();
    }

    save() {
      this.center.name = this.editName;
      this.gotoCenterlist();
    }

    canDeactivate(): Promise<boolean> | boolean {
      // Allow synchronous navigation (`true`) if no center or the center is unchanged
      if (!this.center || this.center.name === this.editName) {
        return true;
      }
      // Otherwise ask the user with the dialog service and return its
      // observable which resolves to true or false when the user decides
      return this.dialogService.confirm('Discard changes?');
    }

    gotoCenterlist() {
      let centerId = this.center ? this.center.id : null;

      this.router.navigate(['../', { id: centerId, foo: 'foo' }], { relativeTo: this.route });
    }


}
