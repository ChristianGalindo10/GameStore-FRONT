import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { GamesComponent } from './admin/games/games.component';
import { ShopgameComponent } from './shopgame/shopgame.component';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/games', component: GamesComponent },
  { path: 'shop', component: ShopgameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
