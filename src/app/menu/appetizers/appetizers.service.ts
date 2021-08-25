import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppetizersService {
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) {}

  public getAppetizers(): Observable<any> {
    return this.http.get(this.rootUrl + 'item?category=Appetizer');
  }
}
