import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  { path: '', component: SignupFormComponent },
  { path: 'signup-details', component: SignupDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
