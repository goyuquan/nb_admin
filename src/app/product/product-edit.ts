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
        status: 'this is status',
        options: {
            status: [
                { name: "下线", value: 0 },
                { name: "准备", value: 2 },
                { name: "上线", value: 1 }
            ],
            unit: [
                { name: "kg", value: 0 },
                { name: "g", value: 2 },
                { name: "个", value: 1 }
            ]
        }
    };
    matcher = new MyErrorStateMatcher();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: ProductService
    ) {
        this.createForm();
        this.productGroup.patchValue({//初始整个表单值
            // status: this.productData.status,
            // unit: this.productData.options.unit,
        });
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap['params']);
    }

    createForm() {
        this.productGroup = this.fb.group({
            status: [ null, [ Validators.required ] ],
            name: [ 'gyftiohiu', [
                Validators.required,
                Validators.minLength(2),
            ]],
            price: [ '', [ Validators.required ] ],
            unit: [ null, [ Validators.required ] ],
            origin: [ '', [ Validators.required ] ],
            img_id: [ '', [ Validators.required ] ],
            describe: [ '', [ Validators.required ] ],
        });
    }

    onSubmit() {

    }

    set name() { console.log(this.productGroup.get('name')); }

}
