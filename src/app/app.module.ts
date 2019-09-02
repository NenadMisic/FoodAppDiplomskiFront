import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './heading/heading.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RestoranComponent } from './restorani/restoran/restoran.component';
import { JeloComponent } from './restorani/restoran/jelo/jelo.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    LoginComponent,
    PocetnaComponent,
    RestoraniComponent,
    CreateAccountComponent,
    RestoranComponent,
    JeloComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
