import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { WhatsappService } from 'src/app/services/whatsapp.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-oferta-gestion',
  templateUrl: './oferta-gestion.component.html',
  styleUrls: ['./oferta-gestion.component.css']
})

export class OfertaGestionComponent implements OnInit {

  ofertas!: Array<Oferta>;
  searchOferta!: string;
  ofertaMensaje!: Oferta;

  constructor(private ofertaService: OfertaService, private toastrService: ToastrService, 
  private webTitle: Title,
  private clienteService:ClienteService, private whatsApp: WhatsappService,
  private productoService: ProductoService) {
    this.ofertas = new Array<Oferta>();
    this.ofertaMensaje=new Oferta();
    this.cargarOfertas();
    this.cargarClientes();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de ofertas");
  }

  cargarOfertas() {
    this.ofertaService.cargarOfertas().subscribe(
      result => {
        this.ofertas = new Array<Oferta>();
        result.forEach((element: any) => {
          let oferta: Oferta = new Oferta();
          Object.assign(oferta, element);
          this.ofertas.push(oferta);
        });
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  borrarOferta(id: string) {
    this.ofertaService.borrarOferta(id).subscribe(
      result => {
        this.toastrService.success("Oferta eliminada correctamente.");
        this.cargarOfertas();
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  buscarPorTitulo() {
    if (this.searchOferta.trim() !== '') {
      const ofertasEncontradas = this.ofertas.filter(oferta => oferta.titulo.toLowerCase().includes(this.searchOferta.toLowerCase()));
      this.ofertas = ofertasEncontradas;
    } else {
      this.cargarOfertas();
    }
  }

  cargarOferta(oferta:Oferta){
    this.ofertaMensaje=oferta;
    this.cargarProductosOferta();
  }

  async enviarMensaje(){
    this.clientes.forEach(cliente => {
      let mensaje = `Estimado/a : `+ cliente.usuario.nombre +`
      
      ` +this.construirMensaje();
      this.whatsApp.enviarMensaje(cliente.telefono, mensaje).subscribe(
        (result)=>{
            this.toastrService.info("Se le envio un mensaje para que realize el pago");
        },
        error=>{alert("Error");}
      )
    });

  }

  construirMensaje():string{
    return `Desde Birabar tenemos el agrado de informale que tenemos una oferta que no te podes perder:
    
    Oferta `+this.ofertaMensaje.titulo+ `:

    `+this.ofertaMensaje.descripcion+ `

    Dias: `+this.ofertaMensaje.dias.map(dias => `${dias} `) + `
    Horario desde: ` + this.ofertaMensaje.desde+ ` hasta: `+this.ofertaMensaje.hasta+`
    Productos: ` + this.productosOferta.map(producto => `- ${producto.nombreProducto}`).join(`, 
    ` )+ `.
    Precio: $`+this.ofertaMensaje.precio;
      
  }

  clientes!:Array<Cliente>;
  cargarClientes(){
    this.clienteService.obtenerClientesSuscriptos().subscribe(
      (result) => {
        this.clientes=new Array<Cliente>();
        result.forEach((element: any) => {
          let cliente = new Cliente();
          Object.assign(cliente, element);
          this.clientes.push(cliente);
        });
      },
      (error) => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  productosOferta!:Array<Producto>;
  
  async cargarProductosOferta() {
    this.productosOferta = new Array<Producto>();
    this.ofertaMensaje.productos.forEach(id => {
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosOferta.push(prod);
          });
        }
      );
    });
  }
}
