import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restobar } from 'src/app/models/restobar';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-gestion-whats-app',
  templateUrl: './gestion-whats-app.component.html',
  styleUrls: ['./gestion-whats-app.component.css']
})
export class GestionWhatsAppComponent implements OnInit {

  qr!:any;
  generandoQR: boolean = false;
  generado: boolean = false;
  
  constructor(private whatsAppService:WhatsappService, private webTitle: Title,
              private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion WhatssApp");
  }

  async generarQR() {
    this.generandoQR = true;
    try {
      const result = await this.whatsAppService.postIniciarSession().toPromise();
      this.qr = result;
    } catch (error) {
      this.toastrService.error("Error al generar el código QR.");
    }
    this.generandoQR = false;
    this.generado = true;
  }

  navegarGestionDatos(){
    this.router.navigate(['gestion-restobar']);
  }

  rutaEnviarMensaje():boolean{
    return this.router.url.includes('enviarMensaje');
  }

  volver():void{
    this.router.navigate(['pedidos/gestion']);
  }

}
