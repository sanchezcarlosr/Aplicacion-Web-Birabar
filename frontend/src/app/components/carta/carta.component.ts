import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  listaProductos!:Array<Producto>;
  listaCategorias!:Array<Categoria>;

  constructor(private categoriaService: CategoriaService, private router:Router, 
              private webTitle: Title, private toastrService: ToastrService) { 
    this.listaCategorias=new Array<Categoria>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Carta digital");
    this.obtenerCategorias();
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
      (error) => {
        this.toastrService.error("Error al cargar la lista de categorias.");
      }
    )
  }

  productosPorCategoria(id:string){
    this.router.navigate(['menu-productos', id]);
  }

}
