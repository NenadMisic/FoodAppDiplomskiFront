import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { CreateAccountComponent} from './create-account/create-account.component';
import { RestoranComponent } from './restorani/restoran/restoran.component';
import { JeloComponent } from './restorani/restoran/jelo/jelo.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent}, // dodati /:userId
  { path: 'restorani', component: RestoraniComponent },
  { path: 'restorani/:restoran', component: RestoranComponent },
  { path: 'restorani/:restoran/:jelo', component: JeloComponent },
  { path: '**', redirectTo: '/pocetna'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
