import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  roles: string[];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.refreshData();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'admin') {
        this.isAdmin = true;
      }
    });
  }

  refreshData(){
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
