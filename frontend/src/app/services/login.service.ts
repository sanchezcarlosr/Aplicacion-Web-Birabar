import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;
  hostServe : string;
  constructor(private _http: HttpClient) {
    //this.hostServe = "http://54.157.182.219:3000/api/";
    //this.hostServe = "http://100.24.204.191:3000/api/";
    this.hostServe = "http://localhost:3000/api/";
    this.hostBase = this.hostServe+"usuario/";
  }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }

  public logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("token");
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public rolLogged(){
    let rol = sessionStorage.getItem("rol");
    return rol;
  }

  public getToken():string{
    if (sessionStorage.getItem("token")!= null){
      return sessionStorage.getItem("token")!;
    }
    else{
      return "";
    }
  }
}
