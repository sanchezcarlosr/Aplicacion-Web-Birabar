import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Calificacion } from 'src/app/models/calificacion';
import { Pedido } from 'src/app/models/pedido';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-calificacion',
  templateUrl: './pedido-calificacion.component.html',
  styleUrls: ['./pedido-calificacion.component.css']
})
export class PedidoCalificacionComponent implements OnInit {

  idpedido!:string;
  pedido!:Pedido;
  puntaje!:number;
  observacion!:string;
  calificacion!:Calificacion;

  constructor(private webTitle: Title, private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService, private router:Router,
              private calificacionService: CalificacionService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Calificar Pedido");

    this.activatedRoute.params.subscribe(params => {
      this.idpedido = params['id'];
      this.traerPedido(this.idpedido);
    });
  }

  traerPedido(id:string){
    this.pedido = new Pedido();
    this.pedidoService.getPedidoById(id).subscribe(
      (result) => {
        Object.assign(this.pedido, result);
      },
      error => {
        console.log(error);
      }
    );
  }

  volver(){
    this.router.navigate(['mis-pedidos']);
  }

  obtenerPuntaje(puntaje:number){
    this.puntaje = puntaje;
  }

  crearCalificacion(){
    let fechaActual = new Date();
    let fechaFormateada = fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    this.calificacion = new Calificacion;
    this.calificacion.fecha = fechaFormateada;
    this.calificacion.observacion = this.observacion;
    this.calificacion.puntaje = this.puntaje;

    this.calificacionService.guardarCalificacion(this.calificacion).subscribe(
      (result) => {
        this.calificacion._id = result.calificacion._id;
        this.toastrService.success('¡Gracias por tus comentarios! Ahora podes ver tu calificación en el detalle del pedido.');
        
        this.pedido.calificacion = this.calificacion;
        this.pedidoService.editPedido(this.pedido).subscribe(
          (result) => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );

        this.router.navigate(['mis-pedidos']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
