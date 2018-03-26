import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export class MyTableModel {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

@Injectable()
export class MyTableService {
  constructor( private http: HttpClient ) {}

  getMyTable(url): Observable<any> {
    return this.http.get( url );
  }

}
