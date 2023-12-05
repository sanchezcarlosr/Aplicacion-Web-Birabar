import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restobar } from '../models/restobar';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RestobarService {
  hostBase: string;
  constructor(private _http: HttpClient, private loginService:LoginService) { 
    this.hostBase = this.loginService.hostServe+"restobar/";
  }

  crearRestobar(restobar: Restobar):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(restobar);
    return this._http.post(this.hostBase, body , httpOptions);
  }

  obtenerRestobares():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase, httpOptions);
  }

  editarRestobar(restobar: Restobar): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(restobar);
    return this._http.put(this.hostBase, body , httpOptions);
  }

  obtenerRestobarPorId(id: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase+'obtener-restobar/'+id, httpOptions);
  }

  obtenerRestobarPorNombre(nombre: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase+'obtener-restobar-por-nombre/'+nombre, httpOptions);
  }

  eliminarRestobar(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };
    return this._http.delete(this.hostBase+id, httpOptions);
  }

}
