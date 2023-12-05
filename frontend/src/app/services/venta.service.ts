import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url!:string;
  constructor(private _http: HttpClient, private loginService:LoginService) { 
    this.url = this.loginService.hostServe+'venta/';
  }

  public guardarVenta(fecha:string, idpedido:string) : Observable<any>{
    const body = {
      'fecha': fecha,
      'pedido': idpedido
    }
    return this._http.post(this.url, body);
  }

  public getVentas() : Observable<any>{
    return this._http.get(this.url+'all');
  }

  public getVentasFiltradas(fechaDesde:string, fechaHasta:string, idusuario:string) : Observable<any> {
    return this._http.get(this.url+'filtrar/ventas'+'?fechaDesde='+fechaDesde+'&fechaHasta='+fechaHasta+'&usuario='+idusuario);
  }
  
  public getVentasResumen() : Observable<any> {
    return this._http.get(this.url+'resumen/filtro');
  }
  public getVentasProductoResumen(mes:number) : Observable<any> {
    return this._http.get(this.url+'resumen/mes/'+mes);
  }
  public getVentasClienteResumen(mes:number) : Observable<any> {
    return this._http.get(this.url+'resumen/cliente/'+mes);
  }
}
