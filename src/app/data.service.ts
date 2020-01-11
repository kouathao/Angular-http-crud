import { Injectable } from "@angular/core";
// 1) import HttpClient
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

// error check
import { throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";

// Product interface as the HttpClient.get() call's type parameter in the data service. Go back to the src/app/data.service.ts file and import the Product interface:

import { Product } from "./product";
@Injectable({
  providedIn: "root"
})
export class DataService {
  // retrieving pagination
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  // Next, define the parseLinkHeader() method which parses the Link header and populate the previous variables accordingly:
  parseLinkHeader(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(",");
    var links = {};
    parts.forEach(p => {
      let section = p.split(";");
      var url = section[0].replace(/<(.*)>/, "$1").trim();
      var name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }

  // 1)declare private API route
  private REST_API_SERVER = "http://localhost:3000/products";
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
      .get<Product[]>(this.REST_API_SERVER, {
        params: new HttpParams({ fromString: "_page=1&_limit=20" }),
        observe: "response"
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap(res => {
          console.log(res.headers.get("Link"));
          this.parseLinkHeader(res.headers.get("Link"));
        })
      );
  }
  // This method is similar to sendGetRequest() except that it takes the URL to which we need to send an HTTP GET request.
  public sendGetRequestToUrl(url: string) {
    return this.httpClient
      .get<Product[]>(url, { observe: "response" })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap(res => {
          console.log(res.headers.get("Link"));
          this.parseLinkHeader(res.headers.get("Link"));
        })
      );
  }
}
