import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  baseUrl: string = environment.baseUrl;
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, body);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.baseUrl + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  }

  // content typr blob for download zip file api
  getZip<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, {
      responseType: 'blob' as 'json',
    });
  }

  getDownloadImages<T>(url: string, items: Array<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, {
      file_id: items,
    });
  }
}
