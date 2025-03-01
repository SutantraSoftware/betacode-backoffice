import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { CountryDetailsEditModule } from './country-details-edit/country-details-edit.module';
import { CountryDetailsEditComponent } from './country-details-edit/country-details-edit.component';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { BlogComponent } from './blog/blog.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CardComponent,
    CountryDetailsEditComponent,
    FormsComponent,
    BlogComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    CountryDetailsEditModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
