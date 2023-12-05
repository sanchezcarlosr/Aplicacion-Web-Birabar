import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  listaCategorias!:Array<Categoria>;
  searchCategoria!:string;

  constructor(private categoriaService: CategoriaService, private router:Router, 
              private toastrService: ToastrService, private webTitle: Title) { 
  
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestión de productos");
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.listaCategorias=new Array<Categoria>();
    this.categoriaService.obtenerCategoriasDisponibles().subscribe(
      (result) =>{
        result.forEach((element:any) => {
          let unaCategoria:Categoria = new Categoria();
          Object.assign(unaCategoria, element);
          this.listaCategorias.push(unaCategoria);
        });
      },
      error => {this.toastrService.error("Error al cargar las lista de Categorias");}
    )
  }

  verProductos(id: string){
    this.router.navigate(['gestion-categoria-producto', id]);
  }

  registrarCategoria(){
    this.router.navigate(['alta-categoria', 0]);
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


  buscarPorCategoria(){
    if (this.searchCategoria !== '') {
      const categoriasEncontradas = this.listaCategorias.filter(categoria => categoria.nombreCategoria.includes(this.searchCategoria));
      this.listaCategorias = categoriasEncontradas;
    } else {
      this.obtenerCategorias();
    }
  }

}
