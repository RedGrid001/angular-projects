import { Component, OnInit, Input, Output } from '@angular/core';
import { denuncia } from '../entities/denuncia';
import { EventEmitter } from 'protractor';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compromiso',
  templateUrl: './compromiso.component.html',
  styleUrls: ['./compromiso.component.css']
})
export class CompromisoComponent implements OnInit {

  @Input() compromiso: boolean;

  constructor(private router:Router) {}

  ngOnInit() {
    var sessionCompromiso = sessionStorage.getItem('compromiso');
    if(sessionCompromiso!=null && sessionCompromiso=='true'){
      this.compromiso = true;
      sessionStorage.setItem('compromiso','true');
    }else {
      this.compromiso = false;
      sessionStorage.setItem('compromiso','false');
    }
  }

  Navegar(){
    if(this.compromiso==true) sessionStorage.setItem('compromiso','true'); else sessionStorage.setItem('compromiso','false');
    this.router.navigate(['/denuncia']);
  }

}
