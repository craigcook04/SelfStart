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
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './patient.service';
import { RehabPlansService } from './rehab-plans.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ExerciseService } from './exercise.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DynamicFormsService } from './dynamic-forms.service';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import {UserAccountsService} from './user-accounts.service';


import { EmailService } from './email.service';
import { NewClientComponent } from './new-client/new-client.component';
import { NewClientService } from './new-client.service'

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
    UserAccountsComponent,
    NewClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FileUploadModule
  ],
  providers: [PatientService, RehabPlansService, ExerciseService, DynamicFormsService, EmailService, NewClientService],
  bootstrap: [AppComponent]
})

export class AppModule { }
