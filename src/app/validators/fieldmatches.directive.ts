import { AbstractControl, ValidationErrors, Validator, NgModel, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fieldmatches]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FieldmatchesDirective, multi: true }
  ]
})
export class FieldmatchesDirective implements Validator {

  @Input('fieldmatches')
  fieldmatches!: NgModel;

  constructor() { }

  public validate(c: AbstractControl): ValidationErrors | null {
    return null;
  }

  public registerOnValidatorChange(fn: () => void): void {

  }
}
