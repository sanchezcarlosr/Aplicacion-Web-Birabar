import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  public qrGenerado!:boolean;
  
  constructor(private _http: HttpClient, private loginService:LoginService) { 
    this.qrGenerado = false;
  }

  postIniciarSession():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      )
    };
    this.qrGenerado = true;
    return this._http.post(this.loginService.hostServe+"whatsApp/iniciar", httpOptions);
  }

  enviarMensaje(numero:string, mensaje:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    
    const menssage = {
      'message': mensaje,
      'to':"549"+numero
    }
    
    let body = JSON.stringify(menssage);
    
    return this._http.post(this.loginService.hostServe+"whatsApp/send", body, httpOptions);
  }

}
