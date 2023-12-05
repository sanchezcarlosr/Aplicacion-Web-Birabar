import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Restobar } from 'src/app/models/restobar';
import { RestobarService } from 'src/app/services/restobar.service';

@Component({
  selector: 'app-restobar-gestion',
  templateUrl: './restobar-gestion.component.html',
  styleUrls: ['./restobar-gestion.component.css']
})
export class RestobarGestionComponent implements OnInit {
  restobares!: Array<Restobar>;
  searchRestobar!: string;
  constructor(private restobarService: RestobarService, private toastrService: ToastrService, 
              private webTitle: Title) {
                this.restobares = new Array<Restobar>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion restobares");
    this.obtenerRestobares();
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

  eliminarRestobar(id:string){
    this.restobarService.eliminarRestobar(id).subscribe(
      (result) => {
        this.toastrService.success("Usuario eliminado correctamente.");
        this.obtenerRestobares();
      }
    )
  }


}
