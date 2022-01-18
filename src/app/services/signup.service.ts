import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { SignupData } from '../models/signup-data.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupDataSubject = new BehaviorSubject<SignupData>({} as any);
  private signupData: Observable<SignupData> = this.signupDataSubject.asObservable();

  constructor() { }

  public saveData(data: any): Observable<SignupData> {
    return new Observable((observer) => {
      const { username, email, phoneNumber, country, state } = data || {} as any;
      this.signupDataSubject.next({ username, email, phoneNumber, country, state });
      observer.complete();
    });
  }

  public getData() {
    return this.signupData;
  }
}
