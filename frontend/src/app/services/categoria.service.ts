import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _http: HttpClient, private loginService:LoginService) { }

  createCategoria(categoria: Categoria):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(categoria);
    return this._http.post(this.loginService.hostServe+"categoria", body , httpOptions);
  }

  obtenerCategoria(id: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
        .set('id', id)
    };
    return this._http.get(this.loginService.hostServe+"categoria/"+id, httpOptions);
  }

  updateCategoria(categoria: Categoria): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(categoria);
    return this._http.put(this.loginService.hostServe+"categoria/update", body , httpOptions);
  }

  obtenerCategoriasDisponibles():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ),
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"categoria/", httpOptions);
  }

  eliminarCategoria(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    return this._http.put(this.loginService.hostServe+"categoria/delete/"+id , httpOptions);
  }
}
