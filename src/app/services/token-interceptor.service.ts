import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token:any = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      //clone http to the custom AuthRequest and send it to the server
      const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest);
    } else {
      return next.handle(request);
    }
  }
}
