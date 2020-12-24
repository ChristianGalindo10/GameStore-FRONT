import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/UserLogin';
import { JwtDTO } from '../model/Jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: User): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', nuevoUsuario);
  }

  public login(loginUsuario: UserLogin): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
}
