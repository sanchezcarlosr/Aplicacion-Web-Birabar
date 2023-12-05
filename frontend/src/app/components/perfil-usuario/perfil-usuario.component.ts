import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Usuario } from 'src/app/models/usuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  clienteLogueado!: Cliente;
  usuarioLogueado!: Usuario;
  userId!: string;
  userRol!: string;
  edit: boolean=false;

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService, 
              private clienteService: ClienteService ,private webTitle: Title) { 
    this.userId = sessionStorage.getItem("userid")!;
    this.userRol = sessionStorage.getItem("rol")!;
    this.clienteLogueado = new Cliente();
    this.usuarioLogueado = new Usuario();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Mi perfil");
    this.verificarTipoUsuario();
  }

  /**
   * Obtiene los datos del usuario logueado llamando al servicio getUsuarioById.
   */
  obtenerUsuario(){
    this.usuarioService.getUsuarioById(this.userId).subscribe(
      (result) => {
        Object.assign(this.usuarioLogueado, result);
      },
      (error) => { 
        console.log(error) 
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  /**
   * Obtiene los datos del cliente logueado llamando al servicio obtenerCliente.
   */
  obtenerCliente(){
    this.clienteService.obtenerCliente(this.userId).subscribe(
      (result) => {
        Object.assign(this.clienteLogueado, result);
      },
      (error) => { 
        console.log(error) 
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  /**
   * Verifica el tipo de usuario (cliente o usuario) y obtiene los datos correspondientes.
   */
  verificarTipoUsuario(){
    if(this.userRol=='Cliente'){
      this.obtenerCliente();
    }else{
      this.obtenerUsuario();
    }
  }

  /**
   * Habilita o deshabilita la edición de datos del perfil.
   */
  habilitarModificacion(){
    if(this.edit==false){
      this.edit=true;
    }else{
      this.edit=false;
    }
  }

  /**
   * Modifica los datos del cliente llamando al servicio editCliente.
   * Si la modificación es exitosa, se llama al método modificarDatosUsuario.
   */
  modificarDatosCliente(){
    this.clienteService.editCliente(this.clienteLogueado).subscribe(
      (result) => {
        if (result.status == 1) {
          this.modificarDatosUsuario();
          this.msgAlert('success', 'Modificación exitosa.', 'Tus datos han sido actualizados.');
        }
      },
      (error) => { 
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  /**
   * Modifica los datos del usuario llamando al servicio editUsuario.
   */
  modificarDatosUsuario(){
    let usuarioModificado = new Usuario();
    Object.assign(usuarioModificado, this.usuarioLogueado);
    if(this.userRol==='Cliente'){
      Object.assign(usuarioModificado, this.clienteLogueado.usuario);
    }
    this.usuarioService.editUsuario(usuarioModificado).subscribe(
      (result) => {
        if (result.status == 1) {
          this.msgAlert('success', 'Modificación exitosa.', 'Tus datos han sido actualizados.');
        }
      },
      (error) => { console.log(error) }
    )
  }

  /**
   * Verifica el tipo de modificación a realizar (cliente o usuario) y llama a los métodos correspondientes.
   * Finalmente, deshabilita la edición de datos.
   */
  verificarTipoModificacion(){
    if(this.userRol=='Cliente'){
      this.modificarDatosCliente();
    }else{
      this.modificarDatosUsuario();
    }
    this.edit=false;
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

  suscribirse(){
    if(this.clienteLogueado.suscripto==true){
      this.clienteLogueado.suscripto=false;
    }else{
      this.clienteLogueado.suscripto=true;
    }
    this.modificarDatosCliente();
  }

}
