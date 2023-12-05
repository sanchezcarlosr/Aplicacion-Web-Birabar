import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http:HttpClient, private loginService:LoginService) { }

  registrarProducto(producto: Producto):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(producto);
    return this._http.post(this.loginService.hostServe+"producto", body , httpOptions);
  }

  obtenerProducto(id: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"producto/obtener-producto/"+id, httpOptions);
  }

  actualizarProducto(producto: Producto): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(producto);
    return this._http.put(this.loginService.hostServe+"producto/edit", body , httpOptions);
  }

  obtenerProductosDisponibles():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"producto/", httpOptions);
  }
  
  obtenerProductosPorCategoria(id: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"producto/obtener-productos-categoria/"+id, httpOptions);
  }

  eliminarProducto(id: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.put(this.loginService.hostServe+"producto/delete/"+id, httpOptions);
  }
}
