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
import { PhysioHomeComponent } from './physio-home/physio-home.component';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component' ;
import { ClientExerciseComponent } from './client-exercise/client-exercise.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AssessmentTestComponent} from './assessment-test/assessment-test.component';
import { CompleteAssessmentTestComponent } from './complete-assessment-test/complete-assessment-test.component';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
import { AssignPlanComponent } from './assign-plan/assign-plan.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth.guard'
import { PhysioAuthGuard } from './physio-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import {UnauthorizedComponent } from './unauthorized/unauthorized.component'
import { WrongAccountComponent } from './wrong-account/wrong-account.component'
import { ClientHomeComponent } from './client-home/client-home.component';
import { ManagePermissionsComponent} from './manage-permissions/manage-permissions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component'
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { TimeOffComponent } from './time-off/time-off.component';

//Later: add gueard to the routes that need to be protected
//to do this append ,canActivate: [something] to an object
//ie: , canActivate: [AuthGuard]
const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'howitworks', component: HowItWorksComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin/manageforms', component: DynamicFormsComponent},
  {path: 'physio/clients', component: PatientProfileComponent},
  {path: 'admin/home', component: AdminHomeComponent, canActivate: [AdminAuthGuard]},
  {path: 'physio/rehabplans', component: RehabPlansComponent},
  {path: 'physio/exercises', component: ExercisesComponent},
  {path: 'signup', component: NewClientComponent},
  {path: 'client/bookappointment', component: BookAppointmentComponent},
  {path: 'admin/useraccounts', component:UserAccountsComponent},
  {path: 'clients/:id', component: ClientsOfTherapistComponent},
  {path: 'bookappointment', component: AppointmentsComponent},
  {path: 'physio/home', component: PhysioHomeComponent, canActivate: [PhysioAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'login/forgotten', component: ForgottenPasswordComponent},
  {path: 'login/recover/:id', component: RecoverAccountComponent},
  {path: 'client/exercises', component: ClientExerciseComponent},
  {path: 'physio/assessmenttests', component: AssessmentTestComponent},
  {path: 'physio/assignplans', component: AssignPlanComponent},
  {path: 'completetest', component: CompleteAssessmentTestComponent},
  {path: 'physio/calendar', component: CalendarComponent},
  {path: 'client/completetest', component: CompleteAssessmentTestComponent},
  {path: 'welcome', component: WelcomeHomeComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'admin/wrongaccount', component: WrongAccountComponent},
  {path: 'physio/wrongaccount', component: WrongAccountComponent},  
  {path: 'client/home', component: ClientHomeComponent, canActivate: [AuthGuard]},
  {path: 'client/transactions', component: TransactionsComponent},
  {path: 'managepermissions', component: ManagePermissionsComponent},
  {path: 'client/settings', component: SettingsComponent},
  {path: 'admin/settings', component: SettingsComponent},
  {path: 'physio/settings', component: SettingsComponent},
  {path: 'physio/reports/:id', component: GenerateReportComponent},
  {path: 'physio/timeoff', component: TimeOffComponent},
  {path: '**', component: NotFoundComponent} //this NEEDS to be last
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }