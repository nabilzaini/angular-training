import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppstateService } from './appstate.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appStateService:AppstateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appStateService.state = 'LOADING';
    let req = request.clone({
      headers: request.headers.set("Authorization", "Bearer JWT")
    });
    return next.handle(req).pipe(
      finalize(() => {this.appStateService.state = 'LOADED';})
    );
  }
}
