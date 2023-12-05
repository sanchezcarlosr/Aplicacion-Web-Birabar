import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  URI!:string; 
  constructor(private _http:HttpClient, private loginService:LoginService) {
    this.URI = this.loginService.hostServe+"combo/";
   }


   registrarCombo(combo:Combo):Observable<any>
   {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(combo);
   return this._http.post(this.URI,body,httpOptions);
   }

   obtenerCombos():Observable<any>
   {
    let httpOptions = {
      headers: new HttpHeaders(), 
      params: new HttpParams()
    };
   
    return this._http.get(this.URI,httpOptions);
   }

   obtenerComboById(id:string)
   {
   
    let httpOptions = {
      headers: new HttpHeaders(), 
      params: new HttpParams()
    };
   
    return this._http.get(this.URI+"obtener-combo/"+id,httpOptions);
   }
   editarCombo(combo:Combo):Observable<any>
   {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(combo);
   return this._http.put(this.URI+combo._id,body,httpOptions);
   }

   eliminarComboById(id:string)
   {
    let httpOptions = {
      headers: new HttpHeaders(), 
      params: new HttpParams()
    };
   
    return this._http.delete(this.URI+id,httpOptions);
   }

}
