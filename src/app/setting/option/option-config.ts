import { Component, OnInit, HostBinding, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormArray, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { SettingService } from '../setting.service';
import { ConfigService } from '../../share/config.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: './option-config.html',
  styleUrls: ['./option-config.scss'],
})
export class OptionConfig {
  displayedColumns = ['option', 'config']
  dataSource: MatTableDataSource<Element>
  title: ''
  option: string | number = 'temp'
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    public config: ConfigService,
    public dialog: MatDialog,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title = this.route.params['value'].id
    this.route.data
    .subscribe(data => {
      this.dataSource = new MatTableDataSource<Element>(data.options.data)
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
  }

  onCreate() {
    const dialogRef = this.dialog.open(OptionCreateDialog, {
      width: '300px',
      data: { value: this.title }
    });
  }

  onSubmit() {

  }

  onDelete(id) {
    this.settingService.optionDelete(
      '/api/setting/option/item/' + id
    ).subscribe(res => {
      console.log(44446666, res)
    });
  }

  onUpdateOpen(id) {
    this.settingService.optionGet(id).subscribe(res => {
      console.log(44446777, res)
    });
  }

  onUpdate(id) {
    this.settingService.optionUpdate(
      '/api/setting/option/item/',
      {
        url: 234324
      }
    ).subscribe(res => {
      console.log(44446777, res)
    });
  }

}

@Component({
  templateUrl: 'option-create-dialog.html',
})
export class OptionCreateDialog {
  column: string | number
  optionGroup: FormGroup

  constructor(
    public dialogRef: MatDialogRef<OptionCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private settingService: SettingService,
  ) {
    this.column = data.value
    this.createForm()
    this.initForm()
  }

  createForm() {
    this.optionGroup = this.fb.group({
      item: [ '', [ Validators.required ] ],
    });
  }

  initForm() {
    this.optionGroup.patchValue({//初始整个表单值
      item: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSubmit() {
    this.settingService.optionCreate(
        '/api/setting/option/item',
        {
          column: this.column,
          option: this.optionGroup.value.item,
        }
    ).subscribe(res => {
        console.log(44446666, res)
    });
  }

}
