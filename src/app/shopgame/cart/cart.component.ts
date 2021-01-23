import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { HttpClientService } from '../../service/http-client.service';
import { Pedido } from '../../model/Pedido';
import { Game } from '../../model/Game';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  games: Array<Game>;

  @Input()
  cartGames: any;

  users: Array<User>;
  user: User;
  username: string;
  pedido: Pedido;

  constructor(
    private tokenService: TokenService,
    private httpClientService: HttpClientService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.games = this.games.filter(game => { game.isAdded == true });
  }

  addPedido() {
    this.username = this.tokenService.getName();
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    this.user = this.users.find(user => {
      return user.name === this.username;
    });
    this.pedido = new Pedido();
    this.pedido.idUser = this.user.id;
    this.pedido.games = this.games.filter(game => { game.isAdded == true });
    for (let game of this.pedido.games) {
      game.pedidos.push(this.pedido);
      this.httpClientService.updateGame(game).subscribe((game) => {
        this.toastr.success('Game updated', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      });
    }
    this.httpClientService.addPedido(this.pedido).subscribe((pedido) => {
      this.toastr.success('Order added', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/shop']);
    },
    err => {
      this.toastr.error("Error", 'Fail', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    });
  }

  emptyCart(){
    this.cartGames = [];
    sessionStorage.clear();
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }

}
