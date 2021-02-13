import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';
import { Category } from '../model/Category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Array<Game>;
  gamesRecieved: Array<Game>;
  categorias: Array<Category>;
  categoriasRecieved: Array<Category>;
  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response),

    );
    this.httpClientService.getCategories().subscribe(
      response2 => this.categorie(response2),
    );
  }

  Move(value: number): void{
    var leftPosition;
    var numero;
    var aux;
    numero=parseFloat(document.getElementById('track').style.left.slice(0, -2))*-1;
    const slickWidth = 275;
    const trackWidth= document.getElementById('track').offsetWidth-window.screen.width;
    leftPosition = String(numero);
    if(leftPosition < trackWidth && value==2) {
      document.getElementById('track').style.left = `${-1 * (numero + slickWidth)}px`;
    }else if(leftPosition >0 && value==1) {
      document.getElementById('track').style.left = `${-1 * (numero - slickWidth)}px`;
    }
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
      this.games.push(gamewithRetrievedImageField);
    }

  }
  categorie(response2){
    this.categorias= new Array<Category>();
    this.categoriasRecieved = response2;
    for(const categoria of this.categoriasRecieved){
        const categoriasrecibidas= new Category();
        categoriasrecibidas.name=categoria.name;
        categoriasrecibidas.idCat=categoria.idCat;
        categoriasrecibidas.games=categoria.games;
        this.categorias.push(categoriasrecibidas);
    }
  }

}
