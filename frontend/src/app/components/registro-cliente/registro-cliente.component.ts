import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from 'src/app/services/registro.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  usuario!: Usuario;
  cliente!: Cliente;
  user_id!: string;
  first_element: boolean = false;
  passwordsMatch: boolean = true;
  aceptoTerminos: boolean = false;
  element: boolean = false;
  repitPassword!: string;

  constructor(private registerService: RegistroService, private toastrService: ToastrService,
              private usuarioService: UsuarioService , private rolService: RolService,
              private webTitle: Title, private clienteService: ClienteService) {
    this.usuario = new Usuario();
    this.cliente = new Cliente();
    this.obtenerRolCliente();
  }

  ngOnInit(): void {
    this.toastrService.info("Llene todos los campos para avanzar en su registro.")
    this.webTitle.setTitle("Birabar - Crear cuenta");
  }

  /**
 * Método asincrónico para registrar un usuario.
 * @returns Una promesa que se resuelve cuando se completa el registro.
 */
  async registrarUsuario(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.registerService.registerUser(this.usuario).subscribe(
        (result) => { // Si el registro es exitoso, se almacena el ID del usuario y se resuelve la promesa.
          if (result.status == 1) {
            this.user_id = result.userId;
            resolve();
          }
        },
        (error) => {
          this.msgAlert('error', 'Oops...', error.error.msg);
          reject();
        }
      )
    });
  }

  /**
 * Método asincrónico para obtener la información del usuario registrado.
 * @returns Una promesa que se resuelve cuando se obtiene la información del usuario.
 */
  async obtenerUsuario(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.usuarioService.getUsuarioById(this.user_id).subscribe(
        (result) => {
          let usuario_registrado = new Usuario();
          Object.assign(usuario_registrado, result);
          this.cliente.usuario = usuario_registrado;
          resolve();
        },
        (error) => {
          this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
          reject();
        }
      )
    });
  }

  /**
 * Método para registrar un cliente.
 * Se registra primero el usuario y luego se obtiene su información.
 * Luego se registra el cliente asociado al usuario.
 */
  async registrarCliente() {
    await this.registrarUsuario();
    await this.obtenerUsuario();
    this.registerService.registerClient(this.cliente).subscribe(
      (result) => {
        if (result.status == 1) {
          this.msgAlert('success', '¡Bien hecho!', 'Te has registrado exitosamente en nuestra plataforma.');
        }
      },
      (error) => {
        this.msgAlert('error', 'Oops...', error.error.msg);
      }
    )
  }

  /**
   * Metodo para obtener el rol de tipo Cliente.
   */
  obtenerRolCliente(){
    this.rolService.getRolByName("Cliente").subscribe(
      (result) => {
        this.usuario.rol = new Rol();
        Object.assign(this.usuario.rol, result);
      },
      (error) => {
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  /**
 * Método para mostrar una alerta utilizando la librería Swal.
 * @param icon - Icono de la alerta.
 * @param title - Título de la alerta.
 * @param text - Texto de la alerta.
 */
  msgAlert = (icon: any, title: any, text: any) => {
    Swal.fire({ icon, title, text})
  }

  /**
 * Método para verificar si se han completado los campos obligatorios.
 * Actualiza la variable first_element en consecuencia.
 */
  verificarCampos(): void {
    this.first_element = (!!this.usuario.user && !!this.usuario.password && !!this.cliente.email);
  }

  /**
   * Método para validar que las contraseñas ingresadas coincidan.
   */
  checkPasswordsMatch() {
    this.passwordsMatch = (this.usuario.password === this.repitPassword);
  }

  /**
 * Método para marcar/desmarcar la aceptación de términos.
 */
  marcarAceptoTerminos() {
    if(this.aceptoTerminos == false){
      this.aceptoTerminos = true;
    }else{
      this.aceptoTerminos = false;
    }
  }

  /**
 * Método para avanzar al siguiente paso.
 * Establece la variable element en true.
 */
  pasoSiguiente() {
    this.usuarioService.getUsuarioByUserName(this.usuario.user).subscribe(
      (result) => {
        if(result == null){
          this.obtenerCliente();
        }else{
          this.msgAlert('error', 'Oops...', 'El usuario '+ result.user+' ya se encuentra registrado');
        }
      },
      (error) => {
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  obtenerCliente(){
    this.clienteService.obtenerClientePorEmail(this.cliente.email).subscribe(
      (result) => {
        if(result == null){
          this.element=true;
        }else{
          this.msgAlert('error', 'Oops...', 'El usuario '+ result.email+' ya se encuentra registrado');
        }
      },
      (error) => {
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }
  /**
 * Método para retroceder al paso anterior.
 * Establece la variable element en false.
 */
  pasoAtras(){
    this.element = false;
  }
  
}
