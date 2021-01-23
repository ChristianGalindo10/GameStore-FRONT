import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';

@Component({
  selector: 'app-shopgame',
  templateUrl: './shopgame.component.html',
  styleUrls: ['./shopgame.component.css']
})
export class ShopgameComponent implements OnInit {

  games: Array<Game>;

  gamesOut: Array<Game>;

  gamesRecieved: Array<Game>;
  isOpen: boolean;

  cartGames: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }


  ngOnInit() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    //from localstorage retrieve the cart item
    let data = sessionStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartGames = JSON.parse(data);
    } else {
      this.cartGames = [];
    }
    //this.isOpen = false;
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
      gamewithRetrievedImageField.name = game.name;
      //populate retrieved image field so that game image can be displayed
      gamewithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + game.picByte;
      gamewithRetrievedImageField.developer = game.developer;
      gamewithRetrievedImageField.price = game.price;
      gamewithRetrievedImageField.picByte = game.picByte;
      this.games.push(gamewithRetrievedImageField);
    }
  }

  addToCart(gameId) {
    //retrieve game from games array using the game id
    let game = this.games.find(game => {
      return game.id === +gameId;
    });
    let cartData = [];
    //retrieve cart data from localstorage
    let data = sessionStorage.getItem('cart');
    //prse it to json
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    // add the selected game to cart data
    cartData.push(game);
    //updated the cartGames
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    //make the isAdded field of the game added to cart as true
    game.isAdded = true;
  }

  updateCartData(cartData) {
    this.cartGames = cartData;
  }

  goToCart() {
    this.gamesOut = this.games;
    this.router.navigate(['shop/cart']);
  }

  emptyCart() {
    this.cartGames = [];
    sessionStorage.clear();
  }

  minimizer() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      //mostrar
      document.getElementById("carritob").style["bottom"] = '0px';
      document.getElementById("carritot").style["bottom"] = '350px';
      document.getElementById("carritob").style["z-index"] = '1';
      document.getElementById("carritot").style["z-index"] = '1';
    } else {
      //minimizar
      document.getElementById("carritot").style["bottom"] = '0px';
      document.getElementById("carritob").style["bottom"] = '-350px';
      document.getElementById("carritob").style["z-index"] = '0';
      document.getElementById("carritot").style["z-index"] = '0';
    }
  }

}
