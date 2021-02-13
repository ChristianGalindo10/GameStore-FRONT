import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../model/Pedido';

@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.css']
})
export class MygamesComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  selectedPedido: Pedido;
  dataLoad: Promise<boolean>;
  action: string;

  constructor(private httpClientService: HttpClientService, private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedUserId = params['id'];
        const selectedPedidoId = params['idpedido'];
        if (selectedUserId) {
          this.httpClientService.getUsers().subscribe(
            response => this.handleSuccessfulResponse(selectedUserId, response),
          );
          if (selectedPedidoId && this.dataLoad) {
            this.selectedPedido = this.selectedUser.pedidos.find(pedido => pedido.idPedido === +selectedPedidoId);
          }
        } else {
          this.selectedUser = new User();
        }
      }
    );


  }
  handleSuccessfulResponse(selectedUserId, response) {
    this.users = response;
    this.selectedUser = this.users.find(user => user.id === +selectedUserId);
    this.dataLoad = Promise.resolve(true);
  }
  viewOrders(idpedido: number, id: number) {
    this.router.navigate(['mygames'], { queryParams: { id ,idpedido, action: 'view' } });
  }
}
