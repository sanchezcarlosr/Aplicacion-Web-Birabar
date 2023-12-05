import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Cliente } from '../models/cliente';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  hostBaseUsuario: string;
  hostBaseCliente: string;
  hostBaseRol:string;

  constructor(private _http: HttpClient, private loginService:LoginService) {
    this.hostBaseUsuario = this.loginService.hostServe+"usuario/";
    this.hostBaseCliente = this.loginService.hostServe+"cliente/";
    this.hostBaseRol = this.loginService.hostServe+"rol/";
  }

  public registerUser(usuario: Usuario): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    console.log(body);
    return this._http.post(this.hostBaseUsuario + 'registro', body, httpOption);
  }

  public registerClient(cliente: Cliente): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(cliente);
    console.log(body);
    return this._http.post(this.hostBaseCliente, body, httpOption);
  }

  getRolById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBaseRol+"obtener-rol/"+id, httpOptions);
  }


}
