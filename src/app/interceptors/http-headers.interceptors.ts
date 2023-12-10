import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Key': '355697d206mshaa2b25027fd68b8p152b36jsn174d0d59f9fc',
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
                //'Access-Control-Allow-Headers': 'X-RapidAPI-Host',
            },
            setParams: {
                key: '7121baaa231343ceb275e9d53411c4d5',
            }
        });
        return next.handle(req);
    };
        
}