import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-carta-productos',
  templateUrl: './carta-productos.component.html',
  styleUrls: ['./carta-productos.component.css']
})
export class CartaProductosComponent implements OnInit {

  categoria!:Categoria;
  listaProductos!:Array<Producto>;

  constructor(private productoService: ProductoService, private categoriaService:CategoriaService, private router:Router,
              private activatedRoute:ActivatedRoute,  private toastrService: ToastrService,
              private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Carta digital");
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] !== '0'){
        this.obtenerCategoria(params['id']);
        this.obtenerProductosPorCategoria(params['id']);
      }else{
        
      }
    });
  }

  obtenerCategoria(id: string){
    this.categoria=new Categoria();
    this.categoriaService.obtenerCategoria(id).subscribe(
      (result)=>{  
        Object.assign(this.categoria, result);
      }, 
      error=>{this.toastrService.error("Error al obtener la categoria.");}
    )
  }

  obtenerProductosPorCategoria(id: string){
    this.listaProductos=new Array<Producto>();
    this.productoService.obtenerProductosPorCategoria(id).subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{this.toastrService.error("Error al obtener los productos por categoria.");}
    )
  }
  

}
