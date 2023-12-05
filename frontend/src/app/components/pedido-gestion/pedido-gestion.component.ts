import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { Restobar } from 'src/app/models/restobar';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { RestobarService } from 'src/app/services/restobar.service';
import { VentaService } from 'src/app/services/venta.service';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-pedido-gestion',
  templateUrl: './pedido-gestion.component.html',
  styleUrls: ['./pedido-gestion.component.css']
})
export class PedidoGestionComponent implements OnInit {

  pedidos!: Array<Pedido>;
  estadoSeleccionado!: string;
  formadepagoSeleccionada!: string;
  idclienteSeleccionado!: string;
  pedido!: Pedido;
  clientes!: Array<Cliente>;

  pedidoS!: Pedido;

  restobar!: Restobar;

  constructor(private pedidoService: PedidoService, private router: Router,
    private toastrService: ToastrService, private clienteService: ClienteService,
    private ventaService: VentaService, private whatsApp: WhatsappService,
    private restobarService: RestobarService) {
    this.estadoSeleccionado = "";
    this.formadepagoSeleccionada = "";
    this.idclienteSeleccionado = "";
    this.pedido = new Pedido();
    this.pedidos = new Array<Pedido>();
    this.traerPedidos();
    this.traerClientes();
    this.buscarLocal();
  }

  ngOnInit(): void {
  }

  traerPedidos(): void {
    let pedido;
    this.pedidoService.getPedidos().subscribe(
      (result: any[]) => {
        result.forEach(p => {
          pedido = new Pedido();
          Object.assign(pedido, p);
          this.pedidos.unshift(pedido);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelarPedido(idpedido: string): void {
    this.pedidoService.cancelarPedido(idpedido).subscribe(
      result => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrarPedidos(estado: string, idcliente: string, formaDePago: string): void {
    let pedido;
    this.pedidoService.getPedidosFiltrados(estado, idcliente, formaDePago).subscribe(
      (result: any[]) => {
        this.pedidos = new Array<Pedido>();
        result.forEach(p => {
          pedido = new Pedido();
          Object.assign(pedido, p);
          this.pedidos.unshift(pedido);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  setPedido(pedido: Pedido) {
    this.pedido = new Pedido();
    Object.assign(this.pedido, pedido);
  }

  modificarPedido(idpedido: string) {
    this.router.navigate(['pedidos/gestion', idpedido]);
  }

  traerClientes(): void {
    this.clientes = new Array<Cliente>();
    let cliente;
    this.clienteService.obtenerClientes().subscribe(
      (result: any[]) => {
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

  async getPedido(idpedido: string) {
    const result = await this.pedidoService.getPedidoById(idpedido).toPromise();
    this.pedidoS = new Pedido();
    Object.assign(this.pedidoS, result);
  }

  async aceptarPedido(idpedido: string) {
    await this.getPedido(idpedido);
    this.pedidoS.estado = "En curso";
    this.pedidoService.editPedido(this.pedidoS).subscribe(
      (result) => {
        location.reload();
      }
    );
  }

  async finalizarPedido(idpedido: string) {
    await this.getPedido(idpedido);
    this.pedidoS.estado = "Finalizado";
    this.pedidoService.editPedido(this.pedidoS).subscribe(
      (result) => {
        let fecha = new Date();
        let fechaFormateada = fecha.toISOString().slice(0, 10);
        this.ventaService.guardarVenta(fechaFormateada, this.pedidoS._id).subscribe(
          (result) => {
            this.toastrService.success('Se guardó una nueva venta: ' + result.venta._id);
            location.reload();
          }
        );
      }
    );
  }

  /**
 * Agregando la funcionalidad para enviar mensaje
 */

  enviarMensaje() {
    if (this.whatsApp.qrGenerado == true) {
      let mensaje = this.obtenerMensajePago();
      if (this.pedido.formaDePago !== "Efectivo") {
        this.whatsApp.enviarMensaje(this.pedido.cliente.telefono, mensaje).subscribe(
          (result) => {
            this.toastrService.info("Se le envio un mensaje para que realize el pago");
          },
          error => { alert("Error"); }
        )
      }
    }else{
      this.router.navigate(['gestion-whatsapp/enviarMensaje']);
    }
  }

  obtenerMensajePago(): any {
    return `Estimado/a ` + this.pedido.cliente.usuario.nombre + `
  
        Hemos recibido su pedido y deseamos informarle sobre los detalles de su compra:
  
        * Total a pagar: $ `+ this.pedido.total + `
        * Productos solicitados: 
        `+ this.pedido.detalleProductos.map(detalle => `- ${detalle.producto.nombreProducto} - $ ${detalle.producto.precio} `).join(`, 
        `) + `.
        * Método de pago: `+ this.pedido.formaDePago + `
  
  
        A continuación, le proporcionamos los datos necesarios para que pueda realizar el pago:
        `+ this.obtenerDatosPago() + `
  
        
        Su satisfacción es nuestra prioridad y nos esforzamos por brindarle una experiencia culinaria excepcional.
        
        Si tiene alguna solicitud especial o requerimiento adicional, no dude en hacérnoslo saber.
  
        ¡Esperamos con ansias recibirlo/a en nuestro Restobar y brindarle una deliciosa experiencia gastronómica!
  
        Atentamente,
        Equipo de Birabar
  
        `;
  }

  obtenerDatosPago(): string {
    let medio;
    if (this.pedido.formaDePago === "Tarjeta") {
      medio = this.restobar.linkTarjeta;
    } else if (this.pedido.formaDePago === "Link de pago") {
      medio = this.restobar.linkPago;
    } else {
      medio = this.restobar.linkTransferencia;
    }
    return medio;
  }

  buscarLocal() {
    this.restobarService.obtenerRestobarPorNombre('Birabar').subscribe(
      (result) => {
        this.restobar = new Restobar();
        Object.assign(this.restobar, result);
      },
      error => { alert("Error"); }
    )
  }
}
