import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ErrorStateMatcher } from '@angular/material/core';


import { ProductService } from './product.service';
import { ConfigService } from '../share/config.service';
import { ProductModel } from './product.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    templateUrl: './product-edit.html',
    styleUrls: ['./product-edit.scss'],
})
export class ProductEdit {
    productGroup: FormGroup;
    forms: any;
    selectedId: number;
    productData = {

    }
    matcher = new MyErrorStateMatcher();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductService
    ) {}

    ngOnInit() {
        console.log(this.route.snapshot.paramMap['params'])
    }

}
