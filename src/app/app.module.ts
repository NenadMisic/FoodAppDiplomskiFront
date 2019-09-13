import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ErrorComponent } from './error/error.component';

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
    ShoppingCartComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
