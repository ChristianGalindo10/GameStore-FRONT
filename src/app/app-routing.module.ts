import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { GamesComponent } from './admin/games/games.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ShopgameComponent } from './shopgame/shopgame.component';
import { CartComponent } from './shopgame/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent,  canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'admin/games', component: GamesComponent,  canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'admin/categories', component: CategoriesComponent,  canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'shop', component: ShopgameComponent,  canActivate: [guard], data: { expectedRol: ['user','admin'] } },
  { path: 'shop/cart', component: CartComponent,  canActivate: [guard], data: { expectedRol: ['user','admin'] } },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
