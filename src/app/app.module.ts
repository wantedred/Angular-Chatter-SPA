import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './core/navbar/navbar.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { PopupViewComponent } from './shared/components/popup-view/popup-view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainComponent } from './modules/chat/main/main.component';
import { MembersComponent } from './modules/chat/main/members/members.component';
import { InputComponent } from './modules/chat/main/input/input.component';
import { MessagesComponent } from './modules/chat/main/messages/messages.component';
import { Error404Component } from './modules/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    MessagesComponent,
    PopupViewComponent,
    MainComponent,
    MembersComponent,
    InputComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    ScrollingModule,
    MatTabsModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
