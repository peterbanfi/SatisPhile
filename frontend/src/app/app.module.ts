import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SatisfactionService } from './satisfaction.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ContactComponent } from './contact/contact.component';
import { CustomDatePipe } from './custom-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavComponent,
    ContactComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [UserService, CookieService, SatisfactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
