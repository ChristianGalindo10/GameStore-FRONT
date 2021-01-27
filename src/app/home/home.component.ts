import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Game } from '../model/Game';
/*const buttonPrev =document.getElementById('button-prev');
const buttonNext =document.getElementById('button-next');*/

const slickList =document.getElementById('sick-list');
const slick= document.querySelectorAll('.slick');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Array<Game>;
  gamesRecieved: Array<Game>;
  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getGames().subscribe(
      response => this.handleSuccessfulResponse(response),
      
    );
  }

  Move(value: number): void{
    var leftPosition;
    var numero;
    var aux;
    numero=parseFloat(document.getElementById('track').style.left.slice(0, -2))*-1;
    const slickWidth = 275;
    const trackWidth= 1925-window.screen.width;
    
    /*const slickWidth = (document.getElementsByClassName('.slick')[0]).offsetWidth;
    const trackWidth = document.getElementById('track').offsetWidth;
    const listWidth =document.getElementById('sick-list').offsetWidth;*/
    /*document.getElementById('track').style.left == "" ? leftPosition = document.getElementById('track').style.left = "0" :*/ leftPosition = String(numero);
    console.log(leftPosition);
    if(leftPosition < trackWidth && value==2) {
      document.getElementById('track').style.left = `${-1 * (numero + slickWidth)}px`;
    }else if(leftPosition >0 && value==1) {
      document.getElementById('track').style.left = `${-1 * (numero - slickWidth)}px`;
    } 
    /*numero=0;
    leftPosition=0;*/
  }
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
}
