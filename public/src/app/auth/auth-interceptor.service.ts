import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';

// import { CUSTOMERROR } from './../../shared/models/error-handler.model';
// import { SessionService } from '../services/sesion.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Checking token is available or not
        const token = localStorage.getItem('token') || '';
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        // Pass the modified request to the next handler
        return next.handle(req);
    }
}