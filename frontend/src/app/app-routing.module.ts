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
import {RouterLinkActive} from '@angular/router';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {RehabPlansComponent} from './rehab-plans/rehab-plans.component';
<<<<<<< HEAD
import { ExercisesComponent } from './exercises/exercises.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
=======
import {ExercisesComponent} from './exercises/exercises.component';
import {NewClientComponent} from './new-client/new-client.component';
>>>>>>> e99fafc6ac8f6bb4b49b8d435cdeb14632a05f83

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'howitworks', component: HowItWorksComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'manageforms', component: DynamicFormsComponent},
  {path: 'client', component: PatientProfileComponent},
  {path: 'adminhome', component: AdminHomeComponent},
  {path: 'rehabplans', component: RehabPlansComponent},
  {path: 'exercises', component: ExercisesComponent},
<<<<<<< HEAD
  {path: 'bookappointment', component: BookAppointmentComponent}
=======
  {path: 'signup', component: NewClientComponent}
>>>>>>> e99fafc6ac8f6bb4b49b8d435cdeb14632a05f83
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
