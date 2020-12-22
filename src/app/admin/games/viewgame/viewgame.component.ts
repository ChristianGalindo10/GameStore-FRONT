import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../../model/Game';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../../service/http-client.service';

@Component({
  selector: 'app-viewgame',
  templateUrl: './viewgame.component.html',
  styleUrls: ['./viewgame.component.css']
})
export class ViewgameComponent implements OnInit {

  @Input()
  game: Game;

  @Output()
  gameDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteGame() {
    this.httpClientService.deleteGame(this.game.id).subscribe(
      (game) => {
        this.gameDeletedEvent.emit();
        this.router.navigate(['admin', 'games']);
      }
    );
  }
  
  editGame() {
    this.router.navigate(['admin', 'games'], { queryParams: { action: 'edit', id: this.game.id } });
  }

}
