import { Component, DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { FieldmatchesDirective } from '../../validators/fieldmatches.directive';
import { SignupDetailsComponent } from '../signup-details/signup-details.component';
import { SignupService } from '../../services/signup.service';
import { CountriesService } from '../../services/countries.service';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let debugElement: DebugElement;
  let formElem: DebugElement;
  let formControl: NgForm;
  let router: RouterTestingModule;
  let signupService: SignupService;
  let countriesService: CountriesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        SignupFormComponent,
        SignupService,
        CountriesService,
      ],
      declarations: [
        SignupFormComponent,
        FieldmatchesDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    formElem = debugElement.query(By.directive(NgForm));
    formControl = formElem && formElem.injector.get(NgForm);
    signupService = TestBed.get(SignupService);
    countriesService = TestBed.get(CountriesService);
    router = debugElement.query(By.directive(RouterTestingModule));
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it('has a form control', () => {
    expect(formControl).toBeTruthy('form should have NgForm control');
  });

  it('should validate username is required', () => {
    const control = getFormControl('username');
    expect(control).toBeTruthy('Expected username control was not found');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy('Username invalid when empty');

      control.setValue('value');
      expect(control.valid).toBeTruthy('Username valid when not empty');
    }
  });

  it('should validate email is correct', () => {
    const control = getFormControl('email');
    expect(control).toBeTruthy('Expected email control was not found');
    if (control) {
      control.setValue('test');
      expect(control.valid).toBeFalsy('Email should be invalid');

      control.setValue('test@test.com');
      expect(control && control.valid).toBeTruthy('Email should be valid');
    }
  });

  it('should validate password with requirements - at least 8 letters, numbers and uppercase', () => {
    const control = getFormControl('password');
    expect(control).toBeTruthy('Expected password control was not found');
    if (control) {
      control.setValue('abc');
      expect(control.valid).toBeFalsy('Password should be invalid');

      control.setValue('Pa55word');
      expect(control.valid).toBeTruthy('Password should be valid');
    }
  });

  it('should validate passwords match', () => {
    // get control
    const control = getFormControl('password');
    const control_match = getFormControl('password_match');

    control && control.setValue('abc1');
    control_match && control_match.setValue('abc2');
    // expect invalid
    expect(control_match && control_match.valid).toBeFalsy('Match should be invalid');
    // set value
    control && control.setValue('Pa55word');
    control_match && control_match.setValue('Pa55word');
    // expect valid
    expect(control_match && control_match.valid).toBeTruthy('Match should be valid');
  });

  it('has .form-username-error when username is invalid', () => {
    const control = getFormControl('username');

    // Make Field Valid
    control && control.setErrors(null);
    fixture.detectChanges();
    expect(getFormError('username')).toBeFalsy('Error message should not be present');

    // Make field invalid
    control && control.setErrors({ fake_error: true });
    fixture.detectChanges();
    expect(getFormError('username')).toBeTruthy('Error message should be present');
  });

  it('has .form-password_match-error when password_match is invalid', () => {
    const control = getFormControl('password_match');

    // Make Field Valid
    control && control.setErrors(null);
    fixture.detectChanges();
    expect(getFormError('password_match')).toBeFalsy('Error message should not be present');

    // Make field invalid
    control && control.setErrors({ fake_error: true });
    fixture.detectChanges();
    expect(getFormError('password_match')).toBeTruthy('Error message should be present');
  });

  /**
   * Gets form control or undefined
   * @param name form control name
   * @returns FormControl
   */
  function getFormControl(name: string) {
    return formControl && formControl.form.get(name);
  }

  /**
   * Returns form error nativeElement for given field
   * @param fieldName
   */
  function getFormError(fieldName: string) {
    const elem = fixture.debugElement.query(
      By.css(`.form-${fieldName}-error`)
    );
    return elem && elem.nativeElement;
  }

  /**
   * @returns Array<String> array of form field names
   */
  function getFormFieldNames() {
    return formControl && Object.keys(formControl.form.controls);
  }
});


@Component({
  template: `
    <signup-form (save)="submit($event)"></signup-form>
  `
})
export class ContainerComponent {
  submit() { }
}

describe('SignupFormComponent Inputs Outputs', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  const appRoutes: Routes = [
    { path: '', component: SignupFormComponent },
    { path: 'signup-details', component: SignupDetailsComponent },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        SignupFormComponent,
        FieldmatchesDirective,
        SignupDetailsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      providers: [
        SignupFormComponent,
        SignupService,
        CountriesService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach((done) => {
    fixture.whenStable().then(done);
  });

  it(`should emit 'save' event when form submitted`, () => {
    spyOn(component, 'submit');
    const form = fixture.debugElement.query(By.directive(NgForm));
    const ngForm = form.injector.get(NgForm);

    for (const name of Object.keys(ngForm.form.controls)) {
      ngForm.form.controls[name].setErrors(null);
    }
    form.nativeElement.dispatchEvent(new Event('submit'));
    expect(component.submit).toHaveBeenCalled();
  });

  it('should not emit event when form is invalid', () => {
    spyOn(component, 'submit');
    const form = fixture.debugElement.query(By.directive(NgForm));
    const ngForm = form.injector.get(NgForm);

    ngForm.form.setErrors({ error: true });
    form.nativeElement.dispatchEvent(new Event('submit'));
    expect(component.submit).not.toHaveBeenCalled();
  });

  it('should execute SignupService.saveData() when form is submitted', () => {
    const signupService = TestBed.get(SignupService);
    spyOn(signupService, 'saveData');

    const form = fixture.debugElement.query(By.directive(NgForm));
    const ngForm = form.injector.get(NgForm);

    for (const name of Object.keys(ngForm.form.controls)) {
      ngForm.form.controls[name].setErrors(null);
    }
    form.nativeElement.dispatchEvent(new Event('submit'));

    expect(signupService.saveData).toHaveBeenCalled();
  });
});
