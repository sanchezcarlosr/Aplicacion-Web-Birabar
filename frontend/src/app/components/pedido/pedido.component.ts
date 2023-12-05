import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Title } from '@angular/platform-browser';
import { PedidoService } from 'src/app/services/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Calificacion } from 'src/app/models/calificacion';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  navSelected=true;
  pedidosEnCurso!: Array<Pedido>;
  pedidosFinalizados!: Array<Pedido>;
  idcliente!:string;
  pedido!:Pedido;

  constructor(private router: Router, private webTitle: Title,
              private pedidoService: PedidoService, private toastrService: ToastrService,
              private loginService: LoginService, private clienteService: ClienteService) {
    this.pedido = new Pedido();
    this.pedido.calificacion = new Calificacion();
    this.pedidosEnCurso = new Array<Pedido>();
    this.pedidosFinalizados = new Array<Pedido>();
    this.traerPedidosCliente();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Pedidos");
  }

  tabActiva(tab:string){
    if (tab == "En curso" ){
      this.navSelected=true;
    }else{
      this.navSelected=false;
    }
  }

  setModalidad(modalidad:string){
    this.router.navigate(["mis-pedidos/productos/", modalidad]);
  }

  cancelarPedido(idpedido:string){
    this.pedidoService.cancelarPedido(idpedido).subscribe(
      (result) => {
        this.toastrService.info("Se canceló el pedido, podes ver el estado en 'Finalizados'.");
        this.traerPedidosCliente();
      },
      error => {
        console.log(error);
      }
    );
  }

  getPedido(pedido:Pedido){
    this.pedido = new Pedido();
    Object.assign(this.pedido, pedido);
  }

  calificarPedido(idPedido:string){
    this.router.navigate(['mis-pedidos/calificacion/', idPedido]);
  }

  getCalificacionPedido(idPedido:string){
    this.pedidoService.getPedidoById(idPedido).subscribe(
      (result) => {
        this.pedido.calificacion = new Calificacion();
        Object.assign(this.pedido.calificacion, result.calificacion);
      },
      error => {
        console.log(error);
      }
    );
  }

  traerPedidosCliente(){
    this.pedidosEnCurso = new Array<Pedido>();
    this.pedidosFinalizados = new Array<Pedido>();
    let pedido;

    if (this.loginService.userLoggedIn()) {
      let idUser = this.loginService.idLogged();
      if (idUser!=null){
        this.clienteService.obtenerCliente(idUser).subscribe(
          (resultC) => {
            this.pedidoService.getPedidosCliente(resultC._id).subscribe(
              (resultP: any[]) => {
                resultP.forEach(e => {
                  pedido = new Pedido();
                  if (e.estado == 'En curso' || e.estado == 'Pendiente'){
                    Object.assign(pedido, e);
                    this.pedidosEnCurso.unshift(pedido);
                  }else{
                    if (e.estado == 'Finalizado' || e.estado == 'Cancelado'){
                      Object.assign(pedido, e);
                      this.pedidosFinalizados.unshift(pedido);
                    }
                  }
                });
              },
              error => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
