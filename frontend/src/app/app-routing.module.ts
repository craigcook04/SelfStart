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
import { ExercisesComponent } from './exercises/exercises.component';
import {UserAccountsComponent} from './user-accounts/user-accounts.component';
import {NewClientComponent} from './new-client/new-client.component';
import{ BookAppointmentComponent } from './book-appointment/book-appointment.component';
import {ClientsOfTherapistComponent} from './clients-of-therapist/clients-of-therapist.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component' 
import {NotFoundComponent} from './not-found/not-found.component'

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
  {path: 'signup', component: NewClientComponent},
  {path: 'bookappointment', component: BookAppointmentComponent},
  {path: 'useraccounts', component:UserAccountsComponent},
  {path: 'signup', component: NewClientComponent},
  {path: 'clients/:id', component: ClientsOfTherapistComponent},
  {path: 'bookappointement', component: AppointmentsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/forgotten', component: ForgottenPasswordComponent},
  {path: 'login/recover/:id', component: RecoverAccountComponent},
  {path: '**', component: NotFoundComponent} //this NEEDS to be last
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }