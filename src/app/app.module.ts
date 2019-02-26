import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil.service';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';

const appRoutes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent }, 
  { path: 'appareils/:id', component: SingleAppareilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AppareilViewComponent,
    AuthComponent,
    SingleAppareilComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppareilService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
