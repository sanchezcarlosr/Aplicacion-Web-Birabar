import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria!: Categoria;
  accion:string="new";

  constructor(private categoriaService: CategoriaService, private router:Router,
              private activatedRoute:ActivatedRoute, private toastrService: ToastrService, 
              private webTitle: Title) { 
    this.categoria = new Categoria();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear categoria")
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === '0'){
        this.accion="new";
      }else{
        this.accion="update";
        this.obtenerCategoria(params['id']);
      }
    });
  }

  registrarCategoria(){
    this.categoriaService.createCategoria(this.categoria).subscribe(
      (result)=>{
        if(result.status==1){
          this.toastrService.success("Se registro correctamente la categoria");
        }else{
          this.toastrService.error("Error al intentar registrar la categoria");
        }
      },
      (error) =>{this.toastrService.error("Error: "+ error);}
    )
    
  }

  obtenerCategoria(id: string){
    this.categoriaService.obtenerCategoria(id).subscribe(
      (result)=>{  
        Object.assign(this.categoria, result);
      }, 
      (error) =>{this.toastrService.error("Error al buscar la categoria.");}
    )
  }

  actualizarCategoria(){
    this.categoriaService.updateCategoria(this.categoria).subscribe(
      (result)=>{
        if(result.status=='1'){
          this.toastrService.success("Categoria modificada correctamente.");
        }else{
          this.toastrService.error(result.msg);
        }
      },
      (error) =>{this.toastrService.error("Error en la actualizacion");}
    )
  }

  onFileSelected(event: any) {
    this.categoria.imagen = "";
    const files = event.target.files[0];
    if (files.size > 16000000) { 
      this.toastrService.warning("El tamaño máximo que se puede subir es de 16Mb");
      event.target.value = "";
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
        this.categoria.imagen = base64;
      };
      reader.readAsDataURL(files);
    }
  }

  regresar(){
    this.router.navigate(['gestion-productos']);
  }

}
