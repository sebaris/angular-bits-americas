import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { SignupDetailsComponent } from './signup-details.component';
import { FieldmatchesDirective } from '../../validators/fieldmatches.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupService } from '../../services/signup.service';
import { Observable, of } from 'rxjs';
import { SignupData } from '../../models/signup-data.model';

class FakeSignupService {
  data: SignupData = {
    username: 'john',
    email: 'john.doe@devskiller.com',
    country: 'United States',
    state: 'Delaware',
    phoneNumber: '(999) 999-9999',
  };

  getData(): Observable<SignupData> {
    return of(this.data);
  }

  saveData() {}
}

describe('SignupDetailsComponent', () => {
  let component: SignupDetailsComponent;
  let fixture: ComponentFixture<SignupDetailsComponent>;
  let debugElement: DebugElement;
  let signupService: FakeSignupService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        SignupDetailsComponent,
        { provide: SignupService, useClass: FakeSignupService },
      ],
      declarations: [
        SignupDetailsComponent,
        FieldmatchesDirective,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    signupService = TestBed.get(SignupService);
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it('should display signup data', fakeAsync(() => {
    const { data } = signupService;

    Object.keys(data).forEach((key) => {
      const element = debugElement.query(By.css(`#${key}`)).nativeElement;
      expect(element).toBeTruthy();
      expect(element && element.textContent).toEqual(data[key]);
    });
  }));
});
