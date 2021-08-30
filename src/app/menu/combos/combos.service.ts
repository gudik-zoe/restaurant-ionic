import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CombosService {
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) {}

  public getCombos(): Observable<any> {
    try {
      return this.http.get(this.rootUrl + 'item?category=menu');
    } catch (err) {
      console.log(err);
    }
  }
}
