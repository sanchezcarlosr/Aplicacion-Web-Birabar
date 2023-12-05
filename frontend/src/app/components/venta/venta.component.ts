import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Calificacion } from 'src/app/models/calificacion';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  ventas!:Array<Venta>;
  venta!:Venta;
  usuarios!:Array<Usuario>;

  fechaDesde!:string;
  fechaHasta!:string;
  usuario!:string;

  constructor(private ventaService: VentaService, private usuarioService: UsuarioService) { 
    this.traerVentas();
    this.iniciarFiltros();
    this.iniciarVenta();
    this.usuarios= new Array<Usuario>();
    this.traerUsuarios();
  }

  ngOnInit(): void {
  }

  iniciarFiltros(){
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.usuario = "";
  }

  iniciarVenta():void{
    this.venta = new Venta();
    this.venta.pedido = new Pedido();
    this.venta.pedido.cliente = new Cliente();
    this.venta.pedido.cliente.usuario = new Usuario();
    this.venta.pedido.calificacion = new Calificacion();
  }

  traerVentas(): void{
    this.ventas = new Array<Venta>();
    let venta;
    this.ventaService.getVentas().subscribe(
      (result: any[]) => {
        result.forEach(v => {
          venta = new Venta();
          Object.assign(venta, v);
          this.ventas.unshift(venta);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  setVenta(venta:Venta){
    this.venta = new Venta();
    Object.assign(this.venta, venta);
  }

  traerUsuarios():void{
    let usuario;
    this.usuarioService.getUsuarios().subscribe(
      (result:any[]) => {
        result.forEach(u => {
          usuario = new Usuario();
          Object.assign(usuario, u);
          this.usuarios.push(usuario);
        });
      }
    );
  }

  filtrarVentas():void{
    this.iniciarVenta();
    this.ventas = new Array<Venta>();
    let venta;
    this.ventaService.getVentasFiltradas(this.fechaDesde, this.fechaHasta, this.usuario).subscribe(
      (result: any[]) => {
        result.forEach(v => {
          venta = new Venta();
          Object.assign(venta, v);
          this.ventas.unshift(venta);
        });
      }, 
      error => {
        console.log(error);
      }
    );
  }
}
