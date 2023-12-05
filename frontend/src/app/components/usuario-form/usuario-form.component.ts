import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from 'src/app/services/registro.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario!: Usuario;
  roles!: Array<Rol>;
  accion!: string;
  
  constructor(private registroService: RegistroService, private usuarioService: UsuarioService,
              private rolService: RolService, private router: ActivatedRoute, 
              private toastrService: ToastrService, private webTitle: Title) {
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear usuario del Sistema");
    this.router.params.subscribe(async params => {
      this.usuario = new Usuario();
      if (params['id'] == 0) {
        this.toastrService.info("Complete todos los campos para crear un nuevo usuario.");
        this.accion = "new";
        await this.obtenerRoles();
        this.roles = this.roles.filter((rol) => rol.nombre !== 'Cliente');
      } else {
        this.toastrService.info("Modifique algunos campos y guarde los cambios para modificar el usuario.");
        this.accion="update"
        this.cargarUsuario(params['id']);
      }
    });
    this.usuario = new Usuario();
  }

  /**
   * Método para registrar un usuario.
   */
  registrarUsuario(){
    this.registroService.registerUser(this.usuario).subscribe(
      (result) => {
        if (result.status == 1) {
          this.msgAlert('success', 'Registro exitoso.', 'El usuario ha sido registrado.');
        }
      },
      (error) => { 
        console.log(error) 
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

  /**
   * Método para modificar un usuario.
   */
  modificarUsuario(){
    this.usuarioService.editUsuario(this.usuario).subscribe(
      (result) => {
        if (result.status == 1) {
          this.msgAlert('success', 'Modificación exitosa.', 'Los datos han sido modificados.');
        }
      },
      (error) => { 
        console.log(error) 
        this.msgAlert('error', 'Oops...', 'Algo ha salido mal!');
      }
    )
  }

   /**
   * Método asincrónico para cargar los datos de un usuario existente.
   * @param id - ID del usuario a cargar.
   */
  async cargarUsuario(id: string){
    await this.obtenerRoles();
    this.usuarioService.getUsuarioById(id).subscribe(
      (result) => {
        Object.assign(this.usuario, result);
        this.usuario.rol = this.roles.find(rol => (rol._id == this.usuario.rol._id))!;
      }
    )
  }

  /**
   * Método asincrónico para obtener los roles disponibles.
   */
  async obtenerRoles(){
    this.roles = new Array<Rol>();
    try {
      this.roles = await this.rolService.getRoles().toPromise();
    } catch (error) {
      console.log(error);
    }
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

}
