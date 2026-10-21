import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('authToken')) {
      this.spinner.show();
      const req = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Token ' + localStorage.getItem('authToken')
        })
      });
      return next.handle(req).pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
        catchError((err: any) => {
          this.spinner.hide();
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              
              this.toastr.error(err.error.data.message)
            }
            if (err.status === 404) {
              this.toastr.error(err.error.error.message)
            }
            if (err.status === 500) {
              this.toastr.error(err.message)
            }
            else if (err.status === 401) {
              if (err.error.message == "User inactive or deleted." || err.error.message == "Subadmin is Deleted." || err.error.message == undefined) {
                localStorage.clear();
                this.router.navigate(['/login']);
              } else {
                this.toastr.error(err.error.message);
              }
            }
            else if (err.status == 0) {
              this.toastr.error('Please check your internet connection');
            }
          }
          return of(err);
        }));
    } else {
      this.spinner.show();
      const req = request.clone({
        headers: new HttpHeaders({
        })
      });
      return next.handle(req).pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
        catchError((err: any) => {
          this.spinner.hide();
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              this.toastr.error(err.error.error.message);
            }
            if (err.status === 500) {
              this.toastr.error(err.message)
            }
            else if (err.status === 401) {
              if (err.error.message == "User inactive or deleted." || err.error.message == "Subadmin is Deleted." || err.error.message == undefined) {
                localStorage.clear();
                this.router.navigate(['/login']);
              } else {
                this.toastr.error(err.error.message);
              }
            }
            // else {
            //     this.toastr.error('Please check your internet connection');
            // }
          }
          return of(err);
        })
      );
    }
  }
}
