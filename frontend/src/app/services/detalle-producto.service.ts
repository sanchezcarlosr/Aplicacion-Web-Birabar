import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  constructor(private _http: HttpClient, private loginService:LoginService) { }

  public createDetalleProd(cantidad:number, idproducto:string, subtotal:number): Observable<any>{
    const body = {
      'cantidad': cantidad,
      'producto': idproducto,
      'subtotal': subtotal
    }
    return this._http.post(this.loginService.hostServe+'detalle-producto', body);
  }

  public getDetalle(id:String): Observable<any>{
    return this._http.get(this.loginService.hostServe+'detalle-producto/'+id);
  }
}
