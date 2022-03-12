import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private apiURL: string = "https://guarded-fjord-97076.herokuapp.com/api/items/";
  // private apiURL: string = "http://localhost:3000/api/items/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  getAllDeletedItems(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'deleted')
      .pipe(catchError(this.errorHandler));
  }

  getItem(id: string): Observable<any> {
    return this.httpClient.get(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  createItem(item: Item): Observable<any> {
    console.log("create");
    return this.httpClient.post(this.apiURL, JSON.stringify(item), this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  updateItem(id: string, item: Item): Observable<any> {
    return this.httpClient.put(this.apiURL + id, JSON.stringify(item), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteItem(id: string) {
    console.log(this.apiURL + id)
    return this.httpClient.delete(this.apiURL + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    console.log(error.error);
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status} -- ${error.error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
