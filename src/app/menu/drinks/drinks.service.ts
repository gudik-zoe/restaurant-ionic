import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) {}

  public getDrinks(): Observable<any> {
    try {
      return this.http.get(this.rootUrl + 'item?category=drink');
    } catch (err) {
      console.log(err);
    }
  }
}
