import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private webTitle: Title, private loginService: LoginService,
              private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Pagina principal")
  }
  
  comprobarUsuario():void{
    if (this.loginService.userLoggedIn() && this.loginService.rolLogged() == 'Cliente'){
      this.router.navigate(['mis-pedidos']);
    }else{
      this.router.navigate(['login']);
      if (this.loginService.userLoggedIn() && (this.loginService.rolLogged() == 'Gestor' || this.loginService.rolLogged() == 'Administrador')){
        this.toastrService.info("Ingresá o registrate como cliente para hacer un pedido.");
      }else{
        this.toastrService.info("Ingresá o registrate para hacer un pedido.");
      }
    }
  }
}
