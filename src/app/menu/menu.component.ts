import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Subscription } from 'rxjs';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  username: string;
  users: Array<User>;
  user: User;
  roles: string[];

  constructor(private tokenService: TokenService,private router: Router, private httpClientService: HttpClientService) { }

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
      this.username = this.tokenService.getName();
      this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    } else {
      this.isLogged = false;
    }
  }
  handleSuccessfulResponse(response){
    this.users = response;
    this.user = this.users.find(user => {
      return user.name === this.username;
    });
  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
  viewOrders(id: number) {
    this.router.navigate(['mygames'], {queryParams : {id}});
  }
}
