import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Warehouse } from './warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private apiURL: string = "https://guarded-fjord-97076.herokuapp.com/api/warehouses/";
  // private apiURL: string = "http://localhost:3000/api/warehouses/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllWarehouses(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  getWarehouse(id: string): Observable<any> {
    return this.httpClient.get(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  createWarehouse(warehouse: Warehouse): Observable<any> {
    return this.httpClient.post(this.apiURL, JSON.stringify(warehouse), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  updateWarehouse(id: string, warehouse: Warehouse): Observable<any> {
    return this.httpClient.put(this.apiURL + id, JSON.stringify(warehouse), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteWarehouse(id: string) {
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
