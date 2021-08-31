/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ResultList } from 'src/app/models/resultList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;
  public getItemsByCategory(category: string) {
    try {
      return this.http.get(this.rootUrl + `item?category=${category}`);
    } catch (err) {
      console.log(err);
    }
  }
}
