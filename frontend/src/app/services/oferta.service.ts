import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private _http: HttpClient, private loginService: LoginService) { }

  registrarOferta(oferta: Oferta): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }
      ),
      params: new HttpParams()
    };
    let body = JSON.stringify(oferta);
    console.log(body);
    return this._http.post(this.loginService.hostServe + "oferta/crearOferta", body, httpOptions);
  }

  modificarOferta(oferta: Oferta): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }
      ),
      params: new HttpParams()
    };
    let body = JSON.stringify(oferta);
    console.log(body);
    return this._http.put(this.loginService.hostServe + "oferta/editarOferta", body, httpOptions);
  }

  cargarOfertas(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe + "oferta/", httpOptions);
  }

  obtenerOferta(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe + "oferta/buscarOferta/" + id, httpOptions);
  }

  borrarOferta(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.delete(this.loginService.hostServe + "oferta/borrarOferta/" + id, httpOptions);
  }

  obtenerDia(): string {
    const fechaComoCadena = new Date(); // día lunes
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
    return nombreDia;
  }

  ofertaDisponible(oferta: Oferta): boolean {
    const desde: string = oferta.desde;
    const hasta: string = oferta.hasta;

    const horaInicio: Date = new Date();
    const [horaDesde, minutosDesde] = desde.split(':');
    horaInicio.setHours(Number(horaDesde), Number(minutosDesde), 0);

    const horaFin: Date = new Date();
    const [horaHasta, minutosHasta] = hasta.split(':');
    horaFin.setHours(Number(horaHasta), Number(minutosHasta), 0);

    const fechaActual: Date = new Date();
    const hora: number = fechaActual.getHours();
    const minutos: number = fechaActual.getMinutes();
    const horaActual: string = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    const fechaHoraActual: Date = new Date();
    const [horaActu, minutosActual] = horaActual.split(':');
    fechaHoraActual.setHours(parseInt(horaActu, 10), parseInt(minutosActual, 10), 0);

    if (
      (horaInicio <= horaFin && fechaHoraActual >= horaInicio && fechaHoraActual <= horaFin) ||
      (horaInicio > horaFin && (fechaHoraActual >= horaInicio || fechaHoraActual <= horaFin))
    ) {
      return true;
    } else {
      return false;
    }
  }

}
