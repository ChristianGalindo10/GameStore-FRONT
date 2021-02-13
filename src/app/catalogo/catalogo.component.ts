import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  games: Array<Game>;

  gamesRecieved: Array<Game>;
  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
   
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
      if(gamewithRetrievedImageField.discount==0){
      
        this.games.push(gamewithRetrievedImageField);
      }
    }
  }

}
