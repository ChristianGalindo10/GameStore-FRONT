import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../../model/Game';
import { HttpClientService } from '../../../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../model/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {

  @Input()
  game: Game;

  categories: Array<Category>;

  @Output()
  gameAddedEvent = new EventEmitter();

  public selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.httpClientService.getCategories().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.categories = response;
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
      this.game.idCatT = this.game.categoryId;
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
      this.httpClient.post('http://localhost:8080/games/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            // ...
            this.httpClientService.addGame(this.game).subscribe(
              (game) => {
                this.toastr.success('Game added', 'OK', {
                  timeOut: 3000, positionClass: 'toast-top-center'
                });
                this.gameAddedEvent.emit();
                this.router.navigate(['admin', 'games']);
              },
              err => {
                this.toastr.error(err.error.mensaje, 'Fail', {
                  timeOut: 3000, positionClass: 'toast-top-center',
                });
              }
            );
            console.log('Image uploaded successfully');
          } else {
            // ...
            console.log('Image not uploaded successfully');
            this.toastr.error('Image not uploaded successfully', 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        }
        );
    } else {
      if (this.imgURL == null) {
        this.game.idCatT = this.game.categoryId;
        this.httpClientService.updateGame(this.game).subscribe(
          (game) => {
            this.toastr.success('Game updated', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.gameAddedEvent.emit();
            this.router.navigate(['admin', 'games']);
          },
          err => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        );
      } else {
        this.game.idCatT = this.game.categoryId;
        const uploadData = new FormData();
        uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
        this.selectedFile.imageName = this.selectedFile.name;
        this.httpClient.post('http://localhost:8080/games/upload', uploadData, { observe: 'response' })
          .subscribe((response) => {
            if (response.status === 200) {
              // ...
              this.httpClientService.updateGameI(this.game).subscribe(
                (game) => {
                  this.toastr.success('Game updated', 'OK', {
                    timeOut: 3000, positionClass: 'toast-top-center'
                  });
                  this.gameAddedEvent.emit();
                  this.router.navigate(['admin', 'games']);
                },
                err => {
                  this.toastr.error(err.error.mensaje, 'Fail', {
                    timeOut: 3000, positionClass: 'toast-top-center',
                  });
                }
              );
              console.log('Image uploaded successfully');
            } else {
              // ...
              console.log('Image not uploaded successfully');
              this.toastr.error('Image not uploaded successfully', 'Fail', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
            }
          }
          );
      }
    }
  }
}
