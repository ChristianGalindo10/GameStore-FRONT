import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/Game';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../model/Category';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Array<Game>;
  gamesRecieved: Array<Game>;
  selectedGame: Game;
  action: string;

  constructor(private httpClientService: HttpClientService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }


  refreshData() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const id = params['id'];
        if (id) {
          this.selectedGame = this.games.find(game => {
            return game.id === +id;
          });
        }
      }
    );
  }
  handleSuccessfulResponse(response) {
    this.games = new Array<Game>();
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
      gamewithRetrievedImageField.idCatT = game.idCatT;
      gamewithRetrievedImageField.categoryId = game.categoryId;
      gamewithRetrievedImageField.categoryName = game.categoryName;
      gamewithRetrievedImageField.discount=game.discount;
      gamewithRetrievedImageField.description=game.description;
      this.games.push(gamewithRetrievedImageField);
    }
  }

  addGame() {
    this.selectedGame = new Game();
    this.router.navigate(['admin', 'games'], { queryParams: { action: 'add' } });
  }

  viewGame(id: number) {
    this.router.navigate(['admin', 'games'], { queryParams: { id, action: 'view' } });
  }

}
