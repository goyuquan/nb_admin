import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ErrorStateMatcher } from '@angular/material/core';

import { ProductService } from './product.service';
import { ConfigService } from '../share/config.service';
import { PatternService } from '../share/parttern.service';
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
    prodectResource = {};
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
        private productService: ProductService,
        private patternService: PatternService
    ) {
        this.createForm();
        this.productGroup.patchValue({//初始整个表单值
            // status: this.productData.status,
            // unit: this.productData.options.unit,
        });
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap['params']);
        this.prodectResource = this.route.snapshot.paramMap['params'];

        // this.route.params
        // .switchMap((params: Params) => this.survey.getSurvey(params['id']))
        // .subscribe((survey: any) => {
        //   // update the form controls
        // });
    }

    createForm() {
        this.productGroup = this.fb.group({
            name: [ 'gyftiohiu', [ Validators.required ]],
            price: [ '', [
                Validators.required,
                Validators.pattern(this.patternService.price),
            ] ],
            status: [ NaN, [ Validators.required ]],
            unit: [ NaN, [ Validators.required ]],
            origin: [ '', [ Validators.required ]],
            img_id: [ '' ],
            describe: [ '', [ Validators.required ]],
        });
    }

    onSubmit() {
        this.productService.postProduct(
            '/api/product/edit/' + this.prodectResource['id'],
            this.productGroup.value
        ).subscribe(res => {
            this.router.navigate(['/product/' + this.prodectResource['id']]);
        });
    }

    setv() {
        this.productGroup.patchValue({name: ''})
    }


}
