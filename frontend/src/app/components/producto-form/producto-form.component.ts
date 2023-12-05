import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto!: Producto;
  accion:string="new";
  listaCategorias!:Array<Categoria>;


  listaProductos!:Array<Producto>;
  constructor(private productoService: ProductoService,private categoriaService: CategoriaService, private router:Router,
              private activatedRoute:ActivatedRoute, private domSanitizer: DomSanitizer,
              private toastrService: ToastrService, private webTitle: Title) { 
    this.producto=new Producto();
    this.listaProductos=new Array<Producto>();
    this.listaCategorias=new Array<Categoria>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear producto");
    this.obtenerTodosProductos();
    this.obtenerCategorias();
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === '0'){
        this.accion="new";
      }else{
        this.accion="update";
        this.obtenerProducto(params['id']);
      }
    });
  }

  registrarProducto(){
    this.producto.disponible=true;
    this.productoService.registrarProducto(this.producto).subscribe(
      (result)=>{
        if(result.status==1){
          this.toastrService.success("Se registro correctamente el producto");
        }else{
          this.toastrService.error("Error al intentar registrar el producto");
        }
      },
      error=>{this.toastrService.error("Error:"+ error);;}
    )
    
  }

  obtenerProducto(id: string){
    this.productoService.obtenerProducto(id).subscribe(
      (result)=>{  
        result.forEach((elemnt:any)=>{
          Object.assign(this.producto, elemnt);
          this.producto.categoria = this.listaCategorias.find(cat => (cat._id == this.producto.categoria._id))!;
        })
      }, 
      error=>{this.toastrService.error("Error al buscar la categoria");}
    )
  }

  obtenerTodosProductos(){
    this.productoService.obtenerProductosDisponibles().subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{alert("Error");}
    )
  }
  
  actualizarProducto(){
    this.productoService.actualizarProducto(this.producto).subscribe(
      (result)=>{
        if(result.status=='1'){
          this.toastrService.success("Se actualizo correctamente el producto");
        }else{
          this.toastrService.error("Error actualizacion de producto");
        }
      },
      error=>{alert("Error en la actualizacion");}
    )
  }

  obtenerCategorias(){
    this.categoriaService.obtenerCategoriasDisponibles().subscribe(
      (result) =>{
        result.forEach((element:any) => {
          let unaCategoria:Categoria = new Categoria();
          Object.assign(unaCategoria, element);
          this.listaCategorias.push(unaCategoria);
        });
      },
      error => {alert("Error al cargar las lista de Categorias");}
    )
  }

  onFileSelected(event: any) {
    this.producto.imagen=""
    const files = event.target.files[0];
    if(files.size > 1600000){
      this.toastrService.warning("El tamaño maximo que se puede subir es de 16Mb");
      event.target.value="";
    }else{
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
        this.producto.imagen=base64;
      };
      reader.readAsDataURL(files);
    }
  }

  cancelarOperacion(){
    this.router.navigate(["gestion-productos"]);
  }
}
