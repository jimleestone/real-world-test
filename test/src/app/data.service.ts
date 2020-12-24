import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  public sendGetRequestToUrl(url: string) {
    return this.httpClient
      .get<Product[]>(url, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  public sendGetRequest() {
    return this.httpClient
      .get<Product[]>(this.REST_API_SERVER, {
        params: new HttpParams({ fromString: '_page=1&_limit=20' }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  parseLinkHeader(header: string) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(',');
    let links = {};
    parts.forEach((p) => {
      let section = p.split(';');
      let url = section[0].replace(/<(.*)>/, '$1').trim();
      let name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
