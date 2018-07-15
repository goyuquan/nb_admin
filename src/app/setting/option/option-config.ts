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
  column: ''
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
    this.column = this.route.params['value'].id
    this.route.data
    .subscribe(data => {
      this.dataSource = new MatTableDataSource<Element>(data.options.data)
    });
  }

  fetch() {
    this.settingService.optionConfig(this.column).subscribe(res => {
      console.log(44445555, res.data)
      this.dataSource = new MatTableDataSource<Element>(res.data)
    })
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

  onCreateOpen() {
    const dialogRef = this.dialog.open(OptionDialog, {
      width: '300px',
      data: { title: '添加', column: this.column }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetch()
    });
  }

  onDelete(id) {
    this.settingService.optionDelete(id).subscribe(res => {
      this.fetch()
    });
  }

  onUpdateOpen(id) {
    this.settingService.optionGet(id).subscribe(res => {
      const dialogRef = this.dialog.open(OptionDialog, {
        width: '300px',
        data: { title: '修改', value: res.data.option, id }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.fetch()
      });
    })
  }

}

@Component({
  templateUrl: 'option-dialog.html',
})
export class OptionDialog {
  id
  column
  title
  option = ''
  optionGroup: FormGroup

  constructor(
    public dialogRef: MatDialogRef<OptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private settingService: SettingService,
  ) {
    this.id = data.id
    this.title = data.title
    this.column = data.column
    this.option = data.value
    this.createForm()
    this.initForm()
  }

  createForm() {
    this.optionGroup = this.fb.group({
      item: [ '', [ Validators.required ] ],
    })
  }

  initForm() {
    this.optionGroup.patchValue({//初始整个表单值
      item: this.option,
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onCreate() {
    this.settingService.optionCreate(
      {
        column: this.column,
        option: this.optionGroup.value.item,
      }
    ).subscribe(res => {
      this.dialogRef.close(OptionDialog)
    });
  }

  onUpdate() {
    this.settingService.optionUpdate(
      this.id,
      {
        column: this.column,
        option: this.optionGroup.value.item,
      }
    ).subscribe(res => {
      this.dialogRef.close(OptionDialog)
    })
  }

}
