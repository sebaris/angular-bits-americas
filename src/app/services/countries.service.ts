import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Country } from '../models/country.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.http.get<any>('../../assets/data.json').pipe(
      map(data => data['countries'])
    );
  }

  public getStates(countryid: number): Observable<State[]> {
    return this.http.get<any>('../../assets/data.json')
            .pipe(
              map( data => data['states'].filter((state:any) => state['countryId'] == countryid))
            );
  }

  public getCountry(countries: Country[], countryId : number): String {
    let selectCountry = countries.filter(country => country.id == countryId);
    return selectCountry[0].name;
  }

  public getState(states: State[], stateId : number): String {
    let selectState = states.filter(state => state.id == stateId);
    return selectState[0].name;
  }
}
