import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { VentaService } from 'src/app/services/venta.service';
import { PedidoGestionComponent } from '../pedido-gestion/pedido-gestion.component';

@Component({
  selector: 'app-pedido-gestion-form',
  templateUrl: './pedido-gestion-form.component.html',
  styleUrls: ['./pedido-gestion-form.component.css']
})
export class PedidoGestionFormComponent implements OnInit {

  idpedido!:string;
  pedido!:Pedido;
  clientes!:Array<Cliente>;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,
              private pedidoService:PedidoService, private toastrService:ToastrService,
              private ventaService: VentaService, private clienteService: ClienteService) { 
    this.pedido = new Pedido();
    this.clientes = new Array<Cliente>();
    this.traerClientes();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idpedido = params['id'];
      this.traerPedido(this.idpedido);
    });
  }

  volver():void{
    this.router.navigate(['pedidos/gestion']);
  }

  traerPedido(id:string){
    this.pedido = new Pedido();
    this.pedidoService.getPedidoById(id).subscribe(
      (result) => {
        Object.assign(this.pedido, result);

        const clienteSeleccionado = this.clientes.find(c => c._id === this.pedido.cliente._id);
        if (clienteSeleccionado) {
          this.pedido.cliente = clienteSeleccionado;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  modificarPedido():void{
    this.pedidoService.editPedido(this.pedido).subscribe(
      (result) => {
        this.toastrService.success('Se modificó el pedido: '+this.pedido._id);
        if (this.pedido.estado == 'Finalizado'){
          let fecha = new Date();
          let fechaFormateada = fecha.toISOString().slice(0, 10);
          this.ventaService.guardarVenta(fechaFormateada, this.pedido._id).subscribe(
            (result) => {
              this.toastrService.success('Se guardó una nueva venta: '+result.venta._id);
            }
          );
        }
        this.router.navigate(['pedidos/gestion']);
      },
      error => {
        console.log(error);
      }
    );
  }

  traerClientes(): void{
    this.clientes = new Array<Cliente>();
    let cliente;
    this.clienteService.obtenerClientes().subscribe(
      (result:any[]) => {
        result.forEach(c => {
          cliente = new Cliente();
          Object.assign(cliente, c);
          this.clientes.push(cliente);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

}
