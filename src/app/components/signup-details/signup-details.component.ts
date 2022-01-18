import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SignupService } from 'src/app/services/signup.service';

import { SignupData } from '../../models/signup-data.model';

@Component({
    selector: 'signup-details',
    templateUrl: './signup-details.component.html'
})
export class SignupDetailsComponent implements OnInit {
    signupData?: SignupData;

    constructor(private signupService: SignupService, private location: Location) { }

    ngOnInit() {
        this.signupService.getData().subscribe(data => {
            this.signupData = data
        });
    }

    goBack(): void {
        this.location.back();
      }
}
