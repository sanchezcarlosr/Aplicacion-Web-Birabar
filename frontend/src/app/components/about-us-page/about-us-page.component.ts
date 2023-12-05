import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent implements OnInit {

  constructor(private router: Router, private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Sobre nosotros")
  }

  navegarOfertas(){
    this.router.navigate(['ofertas']);
  }

  navegarCarta(){
    this.router.navigate(['menu']);
  }

}
