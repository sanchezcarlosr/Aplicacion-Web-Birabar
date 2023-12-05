import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { windowWhen } from 'rxjs';
import { Restobar } from 'src/app/models/restobar';
import { LoginService } from 'src/app/services/login.service';
import { RestobarService } from 'src/app/services/restobar.service';

@Component({
  selector: 'app-local-info',
  templateUrl: './local-info.component.html',
  styleUrls: ['./local-info.component.css']
})
export class LocalInfoComponent implements OnInit {
  restobar!: Restobar;
  constructor(public loginService: LoginService, private restobarService: RestobarService,
              private webTitle: Title) { 
              this.restobar = new Restobar();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Contacto")
    this.buscarLocal();
  }

  buscarLocal(){
    this.restobarService.obtenerRestobarPorNombre('Birabar').subscribe(
      (result) => {
        Object.assign(this.restobar, result);
      },
      (error) => { console.log(error) }
    )
  }

}
