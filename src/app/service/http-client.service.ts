import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { User } from '../model/User';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getGames() {
    return this.httpClient.get<Game[]>('http://localhost:8080/games/get');
  }

  addUploadData(selectedFile) {
    return this.httpClient.post('http://localhost:8080/books/upload', selectedFile);
  }

  addGame(newGame) {
    return this.httpClient.post<Game>('http://localhost:8080/games/add', newGame);
  }

  deleteGame(id) {
    return this.httpClient.delete<Game>('http://localhost:8080/games/' + id);
  }

  updateGame(updatedGame) {
    return this.httpClient.put<Game>('http://localhost:8080/games/update', updatedGame);
  }

  updateGameI(updatedGame) {
    return this.httpClient.put<Game>('http://localhost:8080/games/updatei', updatedGame);
  }
}
