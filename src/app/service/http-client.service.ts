import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Game } from '../model/Game';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

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

  getCategories()
  {
    return this.httpClient.get<Category[]>('http://localhost:8080/categories/get');
  }

  addCategory(newCategory) {
    return this.httpClient.post<Category>('http://localhost:8080/categories/add', newCategory);
  }

  deleteCategory(id) {
    return this.httpClient.delete<Category>('http://localhost:8080/categories/' + id);
  }
}
