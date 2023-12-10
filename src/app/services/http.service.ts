import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`https://api.rawg.io/api/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `https://api.rawg.io/api/games/${id}/movies?key=<YOUR_KEY>`
    );
    const gameScreenshotsRequest = this.http.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=<YOUR_KEY>`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}

