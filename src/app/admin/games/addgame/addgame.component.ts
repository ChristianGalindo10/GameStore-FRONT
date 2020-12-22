import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../../model/Game';
import { HttpClientService } from '../../../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {

  @Input()
  game: Game;

  @Output()
  gameAddedEvent = new EventEmitter();

  public selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  saveGame() {
    //If there is no book id then it is an add book call else it is an edit book call
    if (this.game.id == null) {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
      this.httpClient.post('http://localhost:8080/games/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            // ...
            this.httpClientService.addGame(this.game).subscribe(
              (game) => {
                this.gameAddedEvent.emit();
                this.router.navigate(['admin', 'games']);
              }
            );
            console.log('Image uploaded successfully');
          } else {
            // ...
            console.log('Image not uploaded successfully');
          }
        }
        );
    } else {
      if (this.imgURL == null) {
        this.httpClientService.updateGame(this.game).subscribe(
          (game) => {
            this.gameAddedEvent.emit();
            this.router.navigate(['admin', 'games']);
          }
        );
      } else {
        const uploadData = new FormData();
        uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
        this.selectedFile.imageName = this.selectedFile.name;
        this.httpClient.post('http://localhost:8080/games/upload', uploadData, { observe: 'response' })
          .subscribe((response) => {
            if (response.status === 200) {
              // ...
              this.httpClientService.updateGameI(this.game).subscribe(
                (game) => {
                  this.gameAddedEvent.emit();
                  this.router.navigate(['admin', 'games']);
                }
              );
              console.log('Image uploaded successfully');
            } else {
              // ...
              console.log('Image not uploaded successfully');
            }
          }
          );
      }
    }
  }
}
