import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private _http: HttpClient, private loginService:LoginService) { 

  }

  public guardarCalificacion(calificacion:Calificacion):Observable<any>{
    return this._http.post(this.loginService.hostServe+'calificacion/',calificacion);
  }
  public obtenerCalificaciones():Observable<any>{
    return this._http.get(this.loginService.hostServe+'calificacion/');
  }
  public obtenerResumen():Observable<any>{
    return this._http.get(this.loginService.hostServe+'calificacion/resumen');
  }
  public obtenerResumenPorFecha(fechaInicio:string, fechaFin:string):Observable<any>
  {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams().set('fechaDesde',fechaInicio).set('fechaHasta',fechaFin)
    };
    return this._http.get(this.loginService.hostServe+"calificacion/resumenPorFecha",httpOptions);
  }
}
