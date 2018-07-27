
import {switchMap} from 'rxjs/operators';
import { Component, HostBinding, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';


import { ErrorStateMatcher } from '@angular/material/core';

import { slideInDownAnimation } from '../animations';
import { Center, CenterService } from './center.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class Address {
  street = '';
  city   = '';
}

@Component({
  selector: 'center-list',
  templateUrl: './center-list.html',
  styleUrls: ['./center-list.css'],
  animations: [ slideInDownAnimation ]
})
export class CenterList implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';

  myGroup: FormGroup;
  forms: any;
  center_list$: Observable<Center[]>;
  selectedId: number;
  center_list0$ = [
    {name: 'one', id: 1},
    {name: 'two', id: 2},
    {name: 'three', id: 3},
    {name: 'four', id: 4},
  ];
  states = ['one', 'two', 'three', 'four'];

  centers = {
    email: 'aaa@bbb.ccc',
    state: 'two',
    addresses: [
      {street: '123 Main',  city: 'Anywhere'},
      {street: '456 Maple', city: 'Somewhere'},
    ],
    laire: [
      {street: '111111',  city: 'BeiJing'},
      {street: '2222222', city: 'ShangHai'},
    ]
  }

  matcher = new MyErrorStateMatcher();

  emailChangeLog: string[] = [];

  constructor(
    private service: CenterService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.logEmailChange();
    this.myGroup.patchValue({//初始整个表单值
      email: this.centers.email,
      state: this.centers.state,
      address: this.centers.addresses[0] || new Address(),
    });
    // this.myGroup.patchValue({//初始单一值
    //   email: this.centers.email
    // });
  }

  ngOnChanges() {
    this.myGroup.reset({
      email: this.centers.email
    });

    // this.setAddresses(this.centers.laire);
  }

  logEmailChange() {
    const emailControl = this.myGroup.get('email');
    emailControl.valueChanges.forEach(
      (value: string) => this.emailChangeLog.push(value)
    );
  }

  createForm() {
    this.myGroup = this.fb.group({
      email: [ '', [ Validators.email, Validators.required ] ],
      state: '',
      address: this.fb.group(new Address()),
      secretLairs: this.fb.array([]),
    });
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.myGroup.setControl('secretLairs', addressFormArray);
  }

  revert() { this.ngOnChanges(); }

  get secretLairs(): FormArray {
    return this.myGroup.get('secretLairs') as FormArray;
  };

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  ngOnInit() {
    this.center_list$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.service.getCenteres();
      }));
  }

  onSubmit() {
    this.centers = this.prepareSaveCenters();
    this.ngOnChanges();
  }

  prepareSaveCenters(): any {
    const formModel = this.myGroup.value;

    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    const saveCenter: any = {
      email: formModel.email as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy
    };
    return saveCenter;
  }

}
