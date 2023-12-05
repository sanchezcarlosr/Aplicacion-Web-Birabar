import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario();
  returnUrl!: string;
  msglogin!: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private loginService: LoginService, private toastrService: ToastrService,
              private webTitle: Title) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/principal';
    this.webTitle.setTitle("Birabar - Iniciar sesion");
  }

  /**
   * Realiza el inicio de sesión enviando los datos del formulario al servicio correspondiente.
   * Si el inicio de sesión es exitoso, almacena la información del usuario en el almacenamiento de sesión
   * y redirige a la URL de retorno.
   */
  login() {
    this.loginService.login(this.userform.user, this.userform.password).subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", user.rol);
            this.router.navigateByUrl(this.returnUrl);
            this.toastrService.success("Ha ingresado al sistema exitosamente");
          } else {
            this.toastrService.error("El usuario y/o contraseña son incorrectos. Compruébalos nuevamente.");
          }
        },
        error => {
          this.toastrService.error("Error de conexión.");
        });
  }

}
