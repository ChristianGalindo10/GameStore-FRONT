import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Game } from '../model/Game';
import { Category } from '../model/Category';
import { Pedido } from '../model/Pedido';

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
    return this.httpClient.get<Array<Game>>('http://localhost:8080/games/get');
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
    return this.httpClient.get<Array<Category>>('http://localhost:8080/categories/get');
  }

  getCategory(idCat)
  {
    return this.httpClient.get<Category>('http://localhost:8080/categories/get/' + idCat);
  }
  addCategory(newCategory) {
    return this.httpClient.post<Category>('http://localhost:8080/categories/add', newCategory);
  }

  updateCategory(updatedCategory) {
    return this.httpClient.put<Category>('http://localhost:8080/categories/update', updatedCategory);
  }

  deleteCategory(id) {
    return this.httpClient.delete<Category>('http://localhost:8080/categories/' + id);
  }

  addPedido(newPedido){
    return this.httpClient.post<Pedido>('http://localhost:8080/pedidos/add', newPedido);
  }
}
