/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyInterceptor implements HttpInterceptor {
  constructor(private route: Router) {}
  errorMessage: string;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = '';
        if (!(error.error instanceof ErrorEvent)) {
          //   console.log('this is client side error');
          //   this.errorMessage = `Error: ${error.error.message}`;
          // } else {
          //   console.log('this is server side error');
          //   this.errorMessage = `Error Code: ${error.status},  Message: ${error.error.message}`;
          //   const tokenErrorPhrase = error.error.message;
          if (error.status === 401) {
            console.log('unauthoriesd');
          }
        }
        return throwError(error);
      })
    );
  }
}
