import { Component, OnInit, Input, Output } from '@angular/core';
import { denuncia } from '../entities/denuncia';
import { EventEmitter } from 'protractor';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-compromiso',
  templateUrl: './compromiso.component.html',
  styleUrls: ['./compromiso.component.css']
})
export class CompromisoComponent implements OnInit {

  @Input() compromiso: boolean;

  constructor() { }

  ngOnInit() {
    
  }

}
