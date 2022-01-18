import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CountriesService } from '../../services/countries.service';
import { SignupService } from '../../services/signup.service';
import { SignupData } from '../../models/signup-data.model';
import { Country } from '../../models/country.model';
import { State } from 'src/app/models/state.model';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupData!: SignupData;
  countries: Country[] = [];
  states!: State[];

  @Output()
  save = new EventEmitter<SignupData>();

  constructor(private countriesService: CountriesService, private signupService: SignupService, private router: Router) {
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //get name of country and state    
    form.value.country = this.countriesService.getCountry(this.countries, form.value.country);
    form.value.state = this.countriesService.getState(this.states, form.value.state);
    this.signupService.saveData(form.value).subscribe(data => this.signupData = data);
    this.router.navigateByUrl('signup-details');
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries().subscribe(
      resp =>{
        this.countries = resp;
      });
  }

  onSelectCountry(country: any) {
    this.countriesService.getStates(country.target.value).subscribe( 
      resp => {
        this.states = resp;
      }
    );
  }
}
