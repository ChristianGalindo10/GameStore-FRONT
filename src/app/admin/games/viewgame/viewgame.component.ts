import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../../model/Game';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../service/http-client.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../model/Category';

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

  constructor(private httpClientService: HttpClientService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  deleteGame() {
    this.httpClientService.deleteGame(this.game.id).subscribe(
      (game) => {
        this.toastr.success('Game deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.gameDeletedEvent.emit();
        this.router.navigate(['admin', 'games']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  editGame() {
    this.router.navigate(['admin', 'games'], { queryParams: { action: 'edit', id: this.game.id } });
  }

}
