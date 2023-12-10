import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Key': '<YOUR_RapidAPI_KEY>',
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
                //'Access-Control-Allow-Headers': 'X-RapidAPI-Host',
            },
            setParams: {
                key: '<YOUR_KEY>',
            }
        });
        return next.handle(req);
    };
        
}
