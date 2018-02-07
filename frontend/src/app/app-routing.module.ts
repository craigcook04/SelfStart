import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {HowItWorksComponent} from './how-it-works/how-it-works.component';
import {ServicesComponent} from './services/services.component';
import {FaqComponent} from './faq/faq.component';
import {ContactComponent} from './contact/contact.component';
import {PatientProfileComponent} from './patient-profile/patient-profile.component';
import {DynamicFormsComponent} from './dynamic-forms/dynamic-forms.component';
<<<<<<< HEAD
import { RouterLinkActive } from '@angular/router';
=======
import {AdminHomeComponent} from './admin-home/admin-home.component';
>>>>>>> 55c2774fd478c17e7f42b34ec3ae9ab0698f85b7

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'howitworks', component: HowItWorksComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'manageforms', component: DynamicFormsComponent},
  {path: 'patient', component: PatientProfileComponent},
  {path: 'adminhome', component: AdminHomeComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
