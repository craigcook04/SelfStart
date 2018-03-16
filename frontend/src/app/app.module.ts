import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ServicesComponent } from './services/services.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { RehabPlansComponent } from './rehab-plans/rehab-plans.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import {PhysiotherapistService } from './physiotherapist.service';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './patient.service';
import { RehabPlansService } from './rehab-plans.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ExerciseService } from './exercise.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DynamicFormsService } from './dynamic-forms.service';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import {UserAccountsService} from './user-accounts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatCardModule, MatSidenavModule, MatListModule, MatDialogModule, MatButtonToggleModule } from '@angular/material'; 
import { EmailService } from './email.service';
import { NewClientComponent } from './new-client/new-client.component';
import { NewClientService } from './new-client.service'
import { ImageService } from './image.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ClientsOfTherapistComponent } from './clients-of-therapist/clients-of-therapist.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MomentModule} from 'angular2-moment/moment.module';
import { ClientExerciseComponent } from './client-exercise/client-exercise.component';
import { EncryptionService } from './encryption.service';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AssessmentTestComponent } from './assessment-test/assessment-test.component';
import {AssessmentTestService} from './assessment-test.service';
import { MatButtonModule } from '@angular/material/button';
import { AssignPlanComponent } from './assign-plan/assign-plan.component';
import { CompleteAssessmentTestComponent } from './complete-assessment-test/complete-assessment-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HowItWorksComponent,
    ServicesComponent,
    FaqComponent,
    ContactComponent,
    DynamicFormsComponent,
    RehabPlansComponent,
    ExercisesComponent,
    PatientProfileComponent,
    AdminHomeComponent,
    BookAppointmentComponent,
    UserAccountsComponent,
    NewClientComponent,
    ClientsOfTherapistComponent,
    AppointmentsComponent,
    ClientExerciseComponent,
    LoginComponent,
    ForgottenPasswordComponent,
    RecoverAccountComponent,
    NotFoundComponent,
    AssessmentTestComponent,
    AssignPlanComponent,
    CompleteAssessmentTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    MatGridListModule,
    MomentModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  providers: [PatientService, RehabPlansService, ExerciseService, DynamicFormsService, EmailService, NewClientService,UserAccountsService,ImageService, PhysiotherapistService, EncryptionService, AssessmentTestService],
  bootstrap: [AppComponent]
})

export class AppModule { }
