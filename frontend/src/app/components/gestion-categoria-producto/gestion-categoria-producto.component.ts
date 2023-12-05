import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-gestion-categoria-producto',
  templateUrl: './gestion-categoria-producto.component.html',
  styleUrls: ['./gestion-categoria-producto.component.css']
})
export class GestionCategoriaProductoComponent implements OnInit {

  categoria!:Categoria;
  listaProductos!:Array<Producto>;
  searchProducto!:string;
  producto!:Producto;
  constructor(private categoriaService:CategoriaService, private productoService: ProductoService,private router:Router,
    private activatedRoute:ActivatedRoute, private toastrService: ToastrService) { 
      this.categoria=new Categoria();
      this.producto=new Producto();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === '0'){
        
      }else{
        this.obtenerProductos(params['id']);
        this.obtenerCategoria(params['id']);
      }
    });
  }

  obtenerCategoria(id: string){
    this.categoriaService.obtenerCategoria(id).subscribe(
      (result)=>{  
        Object.assign(this.categoria, result);
      }, 
      error=>{this.toastrService.error("Error al buscar la categoria");}
    )
  }

  obtenerProductos(id: string){
    this.listaProductos=new Array<Producto>();
    this.productoService.obtenerProductosPorCategoria(id).subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{this.toastrService.error("Error");}
    )
  }

  editarCategoria(id: string){
    this.router.navigate(["alta-categoria", id]);
  }

  eliminarCategoria(id: string){
    this.categoriaService.eliminarCategoria(id).subscribe(
      (result)=>{
        if(result.status=="1"){
          this.toastrService.success("Categoria eliminada con exito");
        }else{
          this.toastrService.warning("Esta intentando elimina una categoria que contiene un conjuntos de productos");
        }
      },
      error=>{this.toastrService.error("Error");}
    )
  }

  editarProducto(id:string){
    this.router.navigate(["alta-producto", id]);
  }

  registrarProducto(){
    this.router.navigate(["alta-producto", 0]);
  }

  eliminarProducto(id: string){
    this.productoService.eliminarProducto(id).subscribe(
      (result)=>{
        if(result.status=="1"){
          this.toastrService.success("Producto dado de baja correctamente");
          this.ngOnInit();
        }else{
          this.toastrService.error("Error al intentar dar de baja el producto");
        }
      }, 
      error=>{this.toastrService.error("Error al eliminar el producto");}
    )
  }

  buscarPorProducto(){
    if (this.searchProducto !== '') {
      const productosEncontrados = this.listaProductos.filter(producto => producto.nombreProducto.includes(this.searchProducto));
      this.listaProductos = productosEncontrados;
    } else {
      this.ngOnInit();
    }
  }

  verProducto(p:Producto){
    this.producto=p;
  }

}
