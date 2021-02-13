import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { Pedido } from '../model/Pedido';
import { ToastrService } from 'ngx-toastr';
import { Game } from '../model/Game';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  users: Array<User>;
  user: User;
  username: string;
  pedido: Pedido;
  games: any;
  gamesObject: Array<Game>;
  totalValue : number;

  constructor(
    private tokenService: TokenService,
    private httpClientService: HttpClientService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    //this.games = this.DataService.getCartGames();
    this.games = JSON.parse(sessionStorage.getItem('cart'));
    this.totalValue=0;
    for(let game of this.games){
      this.totalValue += (game.price-game.discount);
    }
  }

  addPedido() {
    this.username = this.tokenService.getName();
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
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
    this.games = cartData;
    //make the isAdded field of the game added to cart as true
    game.isAdded = false;
    this.totalValue -= (game.price-game.discount);
}

  goBack() {
    this.router.navigate(['/shop']);
  }

  handleSuccessfulResponse(response) {
    this.totalValue=0;
    this.users = response;
    this.user = this.users.find(user => {
      return user.name === this.username;
    });
    this.pedido = new Pedido();
    this.pedido.idUser = this.user.id;
    this.gamesObject = new Array<Game>();
    for (const game of this.games) {
      const gameCart = new Game();
      gameCart.id = game.id;
      gameCart.categoryId = game.categoryId;
      gameCart.idCatT = gameCart.categoryId;
      gameCart.name = game.name;
      //populate retrieved image field so that game image can be displayed
      gameCart.retrievedImage = 'data:image/jpeg;base64,' + game.picByte;
      gameCart.developer = game.developer;
      gameCart.price = game.price;
      gameCart.picByte = game.picByte;
      gameCart.discount = game.discount;
      this.totalValue += (game.price-game.discount);
      //if (!this.gamesObject.includes(gameCart)){
        this.gamesObject.push(gameCart);
      //}
    }
    this.pedido.totalValue=this.totalValue;
    this.pedido.games = this.gamesObject;
    this.httpClientService.addPedido(this.pedido).subscribe((pedido) => {
      this.toastr.success('Order added', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      sessionStorage.setItem('cart', JSON.stringify([]));
      this.router.navigate(['/shop']);
    },
      err => {
        this.toastr.error("Error", 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      });
  }

}
