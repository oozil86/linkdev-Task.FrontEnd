import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders:{
        Authorization : `Bearer ${localStorage.getItem('Token')}`
      }
    });

    return next.handle(jsonReq);
  }

}
