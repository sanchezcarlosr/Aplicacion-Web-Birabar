import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { DetalleProductoService } from './detalle-producto.service';
import { DetalleProducto } from '../models/detalle-producto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _http: HttpClient, private loginService:LoginService) {
  }

  private getIdsDetalle(detProds: Array<DetalleProducto>): Array<string> {
    let ids = new Array<string>();
    detProds.forEach(d => {
      ids.push(d._id);
    });
    return ids;
  }

  public createPedido(pedido: Pedido): Observable<any> {
    let idsDetalles = this.getIdsDetalle(pedido.detalleProductos);
    const body = {
      ...pedido,
      'detalleProductos': idsDetalles,
    }
    return this._http.post(this.loginService.hostServe+'pedido/', body);
  }

  public cancelarPedido(id: string): Observable<any> {
    return this._http.delete(this.loginService.hostServe+'pedido/eliminar/' + id);
  }

  public getPedidosCliente(idCliente: string): Observable<any> {
    return this._http.get(this.loginService.hostServe+'pedido/cliente/' + idCliente);
  }

  public getPedidoById(idPedido: string): Observable<any> {
    return this._http.get(this.loginService.hostServe+'pedido/id/' + idPedido);
  }

  public editPedido(pedido: Pedido): Observable<any> {
    let idsDetalles = this.getIdsDetalle(pedido.detalleProductos);
    const body = {
      ...pedido,
      'detalleProductos': idsDetalles,
    }
    return this._http.put(this.loginService.hostServe+'pedido/modificar/', body);
  }

  public getPedidos(): Observable<any> {
    return this._http.get(this.loginService.hostServe+'pedido/all');
  }

  public getPedidosFiltrados(estado: string, idcliente:string, formaDePago: string):Observable<any>{
    return this._http.get(this.loginService.hostServe+'pedido/filtrados?estado='+estado+'&cliente='+idcliente+'&formaDePago='+formaDePago);
  }
}
