import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  newUser: User;
  name: string;
  password: string;
  type: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.type = 'admin';
    this.newUser = new User(this.name, this.password,this.type);
    this.authService.nuevo(this.newUser).subscribe(
      data => {
        this.toastr.success('Account created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
