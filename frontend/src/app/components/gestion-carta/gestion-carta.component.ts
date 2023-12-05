import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-gestion-carta',
  templateUrl: './gestion-carta.component.html',
  styleUrls: ['./gestion-carta.component.css']
})
export class GestionCartaComponent implements OnInit {

  listaProductos!:Array<Producto>;
  searchProducto!:string;
  producto!:Producto;
  constructor(private categoriaService:CategoriaService, private productoService: ProductoService,
    private toastrService: ToastrService) { 
      this.producto=new Producto();
  }

  ngOnInit(): void {
    this.obtenerProductosDisponibles();
  }

  obtenerProductosDisponibles(){
    this.listaProductos= new Array<Producto>();
    this.productoService.obtenerProductosDisponibles().subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{this.toastrService.error("Error al cargar los productos");}
    );
  }

  buscarPorProducto(){
    if (this.searchProducto !== '') {
      const productosEncontrados = this.listaProductos.filter(producto => producto.nombreProducto.includes(this.searchProducto));
      this.listaProductos = productosEncontrados;
    } else {
      this.ngOnInit();
    }
  }


  habilitarProducto(p: Producto){
    p.disponible=true;
    p.categoria.imagen="";
    this.productoService.actualizarProducto(p).subscribe(
      (result)=>{
        if(result.status=='1'){
          this.toastrService.success("Producto disponible para la carta","",{positionClass: 'toast-center-center'});
        }else{
          this.toastrService.error("Error actualizacion de producto");
        }
      },
      error=>{this.toastrService.error("Error en la actualizacion");}
    )
  }

  deshabilitarProducto(p: Producto){
    p.disponible=false;
    p.categoria.imagen="";
    this.productoService.actualizarProducto(p).subscribe(
      (result)=>{
        if(result.status=='1'){
          this.toastrService.error("Producto no disponible para la carta","",{positionClass: 'toast-center-center'});
        }else{
          this.toastrService.error("Error actualizacion de producto");
        }
      },
      error=>{this.toastrService.error("Error en la actualizacion");}
    )
  }

  verProducto(p:Producto){
    this.producto=p;
  }

}
