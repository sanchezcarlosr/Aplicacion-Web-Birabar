import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Combo } from 'src/app/models/combo';
import { Producto } from 'src/app/models/producto';
import { ClienteService } from 'src/app/services/cliente.service';
import { ComboService } from 'src/app/services/combo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-combo-gestion',
  templateUrl: './combo-gestion.component.html',
  styleUrls: ['./combo-gestion.component.css']
})
export class ComboGestionComponent implements OnInit {

  combos!:Array<Combo>;
  searchCombo!: string;
  productosCombo!:Array<Producto>;

  constructor(private comboService:ComboService,
              private webTitle: Title,
              private toast:ToastrService,
              private clienteService:ClienteService,
              private whatsApp: WhatsappService,
              private toastrService: ToastrService,
              private productoService:ProductoService) {
    this.combos = new Array<Combo>(); 
    this.comboEnviar=new Combo();
    this.productosCombo=new Array<Producto>(); 
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de combos");
    this.cargarCombos();
    this.cargarClientes(); 
  }

  cargarCombos():void
  {
    this.combos=[];
    this.comboService.obtenerCombos().subscribe(
      result=>
      {
        result.forEach((element:any) => {
          let combo = new Combo();
          Object.assign(combo,element);
          this.combos.push(combo);
        });
      },
      error=>
      {

      }
    )
  }

  eliminarCombo(id:string):void{
    this.comboService.eliminarComboById(id).subscribe(
    result=>
      {
        this.toast.success("Combo Eliminado correctamente");
        this.cargarCombos();

      },
      error=>
      {

      }
    )
  }

  comboEnviar!:Combo;

  cargarCombo(combo:Combo){
    this.comboEnviar=combo;
    this.cargarProductosCombo();
  }

  async enviarMensaje(){
    this.clientes.forEach(cliente => {
      let mensaje = `Estimado/a : `+ cliente.usuario.nombre +`
      
      ` +this.construirMensaje();
      this.whatsApp.enviarMensaje(cliente.telefono, mensaje).subscribe(
        (result)=>{
            this.toastrService.info("Se envio los detalles del combo a los usuarios");
        },
        error=>{alert("Error");}
      )
    });

  }

  construirMensaje():string{
    return `Desde Birabar tenemos el agrado de informale que tenemos un combo imperdible:
  
    Combo `+this.comboEnviar.titulo+ ` con los siguientes productos: 

    `+ this.productosCombo.map(producto => `- ${producto.nombreProducto}`).join(`, 
    `) + `.
    * Precio Final: `+this.comboEnviar.montoFinal;
  }

  buscarPorTitulo() {
    if (this.searchCombo.trim() !== '') {
      const ofertasEncontradas = this.combos.filter(combo => combo.titulo.toLowerCase().includes(this.searchCombo.toLowerCase()));
      this.combos = ofertasEncontradas;
    } else {
      this.cargarCombos();
    }
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

  async cargarProductosCombo() {
    this.productosCombo = new Array<Producto>();
    this.comboEnviar.productos.forEach(id => {
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosCombo.push(prod);
          });
        }
      );
    });
  }

}
