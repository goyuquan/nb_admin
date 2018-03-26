import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  constructor() { }

  message(err: any) {
    if (err !== undefined) {
      let content = Object.keys(err);
      if (typeof content === "string") {
        return err;
      } else if (Array.isArray(content)) {
        return Object.values(err).join(',');
      }
    }
  }
}
