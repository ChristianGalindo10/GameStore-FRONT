import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import {FormsModule} from '@angular/forms';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { GamesComponent } from './admin/games/games.component';
import { AddgameComponent } from './admin/games/addgame/addgame.component';
import { ViewgameComponent } from './admin/games/viewgame/viewgame.component';
import { ShopgameComponent } from './shopgame/shopgame.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddcategoryComponent } from './admin/categories/addcategory/addcategory.component';
import { ViewcategoryComponent } from './admin/categories/viewcategory/viewcategory.component';
import { CartComponent } from './shopgame/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    GamesComponent,
    AddgameComponent,
    ViewgameComponent,
    ShopgameComponent,
    LoginComponent,
    SigninComponent,
    CategoriesComponent,
    AddcategoryComponent,
    ViewcategoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
