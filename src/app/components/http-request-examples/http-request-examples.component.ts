import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CatFact } from '../../models/cat-fact';
import { DogImage } from '../../models/dog-image';
import { CatFactService } from '../../services/cat-fact.service';
import { DogImageService } from '../../services/dog-image.service';

@Component({
  selector: 'app-http-request-examples',
  templateUrl: './http-request-examples.component.html',
  styleUrls: ['./http-request-examples.component.css'],
})
export class HttpRequestExamplesComponent {
  private readonly doeIetsBijVeranderingSubject = new BehaviorSubject<number>(
    0
  );
  private doeIetsBijVerandering$ =
    this.doeIetsBijVeranderingSubject.asObservable();

  /*
   * d.m.v. pipe( .... ) kun je zoveel maps,taps,mergemaps etc. aan elkaar koppelen als je wil
   */
  catFact$: Observable<CatFact> = this.catFactService.getCatFact().pipe(
    tap((response) => {
      // doe iets met de response zonder hem te manipuleren
      // alleen om te 'peeken'
      console.log(response.length);
      response.fact =
        'er gebeurt niets met deze manipulatie, omdat tap de response niet kan manipuleren';
    }),
    map((response) => {
      // manipuleer response voordat hij naar de template/view gaat
      response.fact =
        'Dit is een manipulation op de response voordat hij naar de view mag ' +
        response.fact;
      return response;
    })
  );

  // pipes en maps e.d. niet nodig als je niets speciaals met de response doet
  eenmaligeDogImage$: Observable<DogImage> = this.dogImageService.getDogImage();

  // mergeMap => 'merge' de acties binnen de pipe naar 1 resultaat
  refreshableDogImage$: Observable<DogImage> = this.doeIetsBijVerandering$.pipe(
    mergeMap((_) => this.dogImageService.getDogImage())
  );

  constructor(
    private readonly catFactService: CatFactService,
    private readonly dogImageService: DogImageService
  ) {}

  haalEenNieuweDogImageOp(): void {
    // alles wat naar (observable variant van) de subject luistert,
    // wordt opnieuw aangeroepen wanneer de waarde veranderd
    this.doeIetsBijVeranderingSubject.next(Math.random());
  }
}
