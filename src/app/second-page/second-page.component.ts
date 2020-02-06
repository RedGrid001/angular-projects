import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

export interface Entidades {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  entidades: Entidades[] = [
    {value: '0', viewValue: 'PNC'},
    {value: '1', viewValue: 'Junta'},
    {value: '2', viewValue: 'Fiscalia'}
  ];

  institucion = new FormControl('', Validators.required);
  director = new FormControl('', Validators.required);
  identificacionce = new FormControl('', Validators.required);
  hechosdesc = new FormControl('', Validators.required);
  fechahechosi = new FormControl('', Validators.required);
  fechahechosf = new FormControl('', Validators.required);


  constructor() { }

  ngOnInit() {
  }

}
