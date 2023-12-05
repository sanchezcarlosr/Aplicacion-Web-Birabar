import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css']
})
export class NoAccessComponent implements OnInit {

  constructor(private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("No tiene acceso a este sitio")
  }

}
