import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  hostBase: string;

  constructor(private _http: HttpClient, private loginService:LoginService) {
    this.hostBase = this.loginService.hostServe+"usuario/";
   }

   getUsuarios():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase, httpOptions);
   }

   getUsuarioById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase+"obtener-usuario/"+id, httpOptions);
  }

  getUsuarioByUserName(user:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase+user, httpOptions);
  }

  deleteUsuario(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };
    return this._http.delete(this.hostBase+id, httpOptions);
  }

  editUsuario(usuario: Usuario):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(usuario);
    return this._http.put(this.hostBase+usuario._id, body , httpOptions);
  }
}
