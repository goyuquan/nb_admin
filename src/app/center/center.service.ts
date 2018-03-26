import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

export class Center {
  constructor(public id: number, public name: string) { }
}

let CENTERS = [
  new Center(1, 'Dragon Burning Cities'),
  new Center(2, 'Sky Rains Great White Sharks'),
  new Center(3, 'Giant Asteroid Heading For Earth'),
  new Center(4, 'Procrastinators Meeting Delayed Again'),
  new Center(5, 'This is a demo item'),
];

// let centersPromise = Promise.resolve(CENTERS);

@Injectable()
export class CenterService {
  static nextCenterId = 100;
  private center$: BehaviorSubject<Center[]> = new BehaviorSubject<Center[]>(CENTERS);

  getCenteres() { return this.center$; }

  getCenter(id: number | string) {
    return this.getCenteres()
      // .then(centers => centers.find(center => center.id === +id));
      .map(centers => centers.find(center => center.id === +id));
  }
}
