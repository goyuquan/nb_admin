import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from './error.service';

@Injectable()
export class HttpService {

    results: string[];
    loading: boolean;
    snackBarAction = 'close';

    constructor(
        private http: HttpClient,
        private error: ErrorService,
        public snackBar: MatSnackBar
    ) {}

    get(url): Observable<any> {
        return this.http.get( url )
    }

    //文件上传请求专用

    upload() {
        const req = new HttpRequest('GET', '/api/user', {
            reportProgress: true,
        });

        this.http.request(req).subscribe(event => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const percentDone = Math.round(100 * event.loaded / event.total);
            this.snackBar.open(`File is ${percentDone}% uploaded.`, null);
        } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            this.snackBar.open(`File is completely uploaded!`, null, { duration: 5000 });
        }
    });
}


}
