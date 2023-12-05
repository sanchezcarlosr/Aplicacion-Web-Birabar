import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-gestion',
  templateUrl: './usuario-gestion.component.html',
  styleUrls: ['./usuario-gestion.component.css']
})
export class UsuarioGestionComponent implements OnInit {

  usuarios!: Array<Usuario>;
  searchUsername!: string;

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService, 
              private webTitle: Title) {
    this.usuarios = new Array<Usuario>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestión de usuarios")
    this.cargarUsuarios();
  }

  /**
   * Carga la lista de usuarios llamando al servicio correspondiente.
   * Ordena los usuarios por el nombre del rol.
   */
  cargarUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      (result) => {
        this.usuarios = new Array<Usuario>();
        result.forEach((element: any) => {
          let usuario = new Usuario();
          Object.assign(usuario, element);
          this.usuarios.push(usuario);
        });
        this.usuarios.sort((a, b) => a.rol.nombre.localeCompare(b.rol.nombre));
      },
      (error) => {
        this.toastrService.error("Error: ", error);
      }
    );
  }
  
  /**
   * Elimina un usuario llamando al servicio correspondiente.
   * @param id - ID del usuario a eliminar.
   */
  eliminarUsuario(id:string){
    this.usuarioService.deleteUsuario(id).subscribe(
      (result) => {
        this.toastrService.success("Usuario eliminado correctamente.");
        this.cargarUsuarios();
      }
    )
  }

  /**
   * Realiza una búsqueda de usuarios por nombre de usuario.
   * Filtra la lista de usuarios según el nombre de usuario ingresado.
   * Si no se ingresa un nombre de usuario, vuelve a cargar la lista completa.
   */
  buscarPorUsername(){
    if (this.searchUsername !== '') {
      const usuariosEncontrados = this.usuarios.filter(usuario => usuario.user.includes(this.searchUsername));
      this.usuarios = usuariosEncontrados;
    } else {
      this.cargarUsuarios();
    }
  }


}
