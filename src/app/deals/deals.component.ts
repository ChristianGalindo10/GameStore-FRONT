import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';
import { Category } from '../model/Category';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  games: Array<Game>;
  dataLoad: Promise<boolean>;
  gamesRecieved: Array<Game>;
  gameDescription : Game;
  categories: Array<Category>;
  seleccionado: string;
  category: Category;
  gamesFilter: Array<Game>;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    this.httpClientService.getCategories().subscribe(
      response => this.handleSuccessfulResponse2(response),
    );
    this.seleccionado = "all";

  }

  // we will be taking the games response returned from the database
  // and we will be adding the retrieved
  handleSuccessfulResponse(response) {
    this.games = new Array<Game>();
    //get books returned by the api call
    this.gamesRecieved = response;
    for (const game of this.gamesRecieved) {
      const gamewithRetrievedImageField = new Game();
      gamewithRetrievedImageField.id = game.id;
      gamewithRetrievedImageField.idCatT = game.idCatT;
      gamewithRetrievedImageField.categoryId = game.categoryId;
      gamewithRetrievedImageField.name = game.name;
      //populate retrieved image field so that game image can be displayed
      gamewithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + game.picByte;
      gamewithRetrievedImageField.developer = game.developer;
      gamewithRetrievedImageField.price = game.price;
      gamewithRetrievedImageField.picByte = game.picByte;
      gamewithRetrievedImageField.discount = game.discount;
      gamewithRetrievedImageField.description=game.description;
      if(gamewithRetrievedImageField.discount!=0){
        this.games.push(gamewithRetrievedImageField);
      }
      this.gamesFilter = this.games;
    }
  }

  filter(selected:string){
    switch(selected) {
      case "all": {
        this.gamesFilter = new Array<Game>();
        this.gamesFilter = this.games;
         break;
      }
      default: {
        this.gamesFilter = new Array<Game>();
        this.category = this.categories.find(category => category.name == selected);
        for (const game of this.games) {
          if(game.categoryId === this.category.idCat && game.discount>0){
            this.gamesFilter.push(game);
          }
        }
         break;
      }
   }
  }

  handleSuccessfulResponse2(response){
    this.categories = response;
  }

  setGame(id){
    this.gameDescription=this.games.find(game=>game.id=== +id);
    this.dataLoad = Promise.resolve(true);
  }



}
