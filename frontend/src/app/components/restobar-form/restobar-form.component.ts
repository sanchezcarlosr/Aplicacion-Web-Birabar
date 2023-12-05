import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restobar } from 'src/app/models/restobar';
import { RestobarService } from 'src/app/services/restobar.service';

@Component({
  selector: 'app-restobar-form',
  templateUrl: './restobar-form.component.html',
  styleUrls: ['./restobar-form.component.css']
})
export class RestobarFormComponent implements OnInit {
  restobar!: Restobar;
  restobares!: Array<Restobar>;
  accion:string="new";

  constructor(private restobarService: RestobarService, private activatedRoute: ActivatedRoute,
              private webTitle: Title, private toastrService: ToastrService) {
    this.restobar = new Restobar();
    this.restobares = new Array<Restobar>();
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear restobar");
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === '0'){
        this.accion="new";
      }else{
        this.accion="update";
        this.obtenerRestobar(params['id']);
      }
    });
  }

  crearRestobar(){
    this,this.restobarService.crearRestobar(this.restobar).subscribe(
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

  obtenerRestobar(id: string){
    this.restobarService.obtenerRestobarPorId(id).subscribe(
      (result) => {
        Object.assign(this.restobar, result);
      },
      (error) => { console.log(error) }
    )
  }

  obtenerRestobares(){
    this.restobarService.obtenerRestobares().subscribe(
      (result) => {
        this.restobares = new Array<Restobar>();
        result.forEach((element: any) => {
          let restobar = new Restobar();
          Object.assign(restobar, element);
          this.restobares.push(restobar);
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  editarRestobar(){
    this.restobarService.editarRestobar(this.restobar).subscribe(
      (result)=>{
        if(result.status=='1'){
          this.toastrService.success("Se actualizo correctamente el producto");
        }else{
          this.toastrService.error("Error actualizacion de producto");
        }
      },
      (error) =>{alert("Error en la actualizacion");}
    )
  }

}
