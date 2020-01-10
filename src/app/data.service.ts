import { Injectable } from "@angular/core";
// 1) import HttpClient
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

// error check
import { throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  // 1)declare private API route
  private REST_API_SERVER = "http://localhost:3000/products?_page=1";
  // 2) pass in construtor
  constructor(private httpClient: HttpClient) {}

  // handle errors
  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
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

  // 3) get request
  public sendGetRequest() {
    return this.httpClient
      .get(this.REST_API_SERVER)
      .pipe(retry(3), catchError(this.handleError));
  }
}
