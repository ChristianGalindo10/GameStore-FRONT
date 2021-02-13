import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';
import { Category } from '../model/Category';

@Component({
  selector: 'app-shopgame',
  templateUrl: './shopgame.component.html',
  styleUrls: ['./shopgame.component.css']
})
export class ShopgameComponent implements OnInit {

  games: Array<Game>;
  gamesRecieved: Array<Game>;
  isOpen: boolean;
  gameDescription : Game;
  cartGames: any;
  dataLoad: Promise<boolean>;
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
    //from localstorage retrieve the cart item
    let data = sessionStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartGames = JSON.parse(data);
    } else {
      this.cartGames = [];
    }
    //this.isOpen = false;
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
      gamewithRetrievedImageField.isAdded = false;
      this.games.push(gamewithRetrievedImageField);
    }
    this.gamesFilter = this.games;
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
    if(!game.isAdded){
      cartData.push(game);
      //save the updated cart data in localstorage
      sessionStorage.setItem('cart', JSON.stringify(cartData));
      data = sessionStorage.getItem('cart');
      //updated the cartGames
      cartData = JSON.parse(data);
      this.updateCartData(cartData);
      //make the isAdded field of the game added to cart as true
      game.isAdded = true;
    }
  }

  updateCartData(cartData) {
    this.cartGames = cartData;
   }

  removeItemFromCart (gameId) {
    let game = this.games.find(game => {
      return game.id === +gameId;
    });
    let cartData = [];
    let data = sessionStorage.getItem('cart');
    //parse it to json
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    const found = cartData.find(element => element.id === game.id);
    var i = cartData.indexOf(found);

    if ( i !== -1 ) {
      cartData.splice( i, 1 );
    }
    sessionStorage.setItem('cart', JSON.stringify(cartData));
     data = sessionStorage.getItem('cart');
     //updated the cartGames
    cartData = JSON.parse(data);
    this.updateCartData(cartData);
    //make the isAdded field of the game added to cart as true
    game.isAdded = false;
}


  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartGames = [];
    sessionStorage.setItem('cart', JSON.stringify(this.cartGames));
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

  filter(selected:string){
    switch(selected) {
      case "all": {
        this.gamesFilter = new Array<Game>();
        this.gamesFilter = this.games;
         break;
      }
      case "deals": {
        this.gamesFilter = new Array<Game>();
        this.category = this.categories.find(category => category.name == selected);
        for (const game of this.games) {
          if(game.discount>0){
            this.gamesFilter.push(game);
          }
        }
         break;
      }
      default: {
        this.gamesFilter = new Array<Game>();
        this.category = this.categories.find(category => category.name == selected);
        for (const game of this.games) {
          if(game.categoryId === this.category.idCat){
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
