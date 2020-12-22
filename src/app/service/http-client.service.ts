import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);
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
