import { TestBed, inject, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let countriesService: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CountriesService,
      ],
    });

    countriesService = TestBed.get(CountriesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCountries() should fetch and return countries from assets/data.json', (done) => {
    const countries = [
      { id: 1, name: 'United States' },
      { id: 2, name: 'India' },
      { id: 3, name: 'Australia' },
      { id: 4, name: 'New Zealand' },
    ];

    countriesService.getCountries().subscribe((res: any) => {
      expect(res).toEqual(countries);
      done();
    });

    const req = httpMock.expectOne('assets/data.json', 'countries from assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush({ countries });
  });

  it('getStates() should fetch and return states for given country from assets/data.json', (done) => {
    const states = [
      { id: 10, countryId: 1, name: 'Virginia' },
      { id: 20, countryId: 1, name: 'Mississippi' },
      { id: 30, countryId: 1, name: 'Wisconsin' },
      { id: 40, countryId: 1, name: 'South Dakota', },
      { id: 50, countryId: 1, name: 'Hawaii' },
    ];

    countriesService.getStates(1).subscribe((res: any) => {
      expect(res).toEqual(states);
      done();
    });

    const req = httpMock.expectOne('assets/data.json', 'states from assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush({ states });
  });
});
