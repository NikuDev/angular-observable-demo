import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogImage } from '../models/dog-image';

@Injectable({
  providedIn: 'root',
})
export class DogImageService {
  constructor(private readonly httpClient: HttpClient) {}

  getDogImage(): Observable<DogImage> {
    return this.httpClient.get<DogImage>(
      'https://dog.ceo/api/breeds/image/random'
    );
  }
}
