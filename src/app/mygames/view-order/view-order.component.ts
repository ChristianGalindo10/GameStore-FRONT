import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pedido } from '../../model/Pedido';
import { HttpClientService } from '../../service/http-client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  @Input()
  pedido: Pedido

  constructor(private httpClientService: HttpClientService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


}
