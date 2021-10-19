import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatFact } from '../models/cat-fact';

@Injectable({
  providedIn: 'root',
})
export class CatFactService {
  constructor(private readonly httpClient: HttpClient) {}

  getCatFact(): Observable<CatFact> {
    return this.httpClient.get<CatFact>('https://catfact.ninja/fact');
  }
}
