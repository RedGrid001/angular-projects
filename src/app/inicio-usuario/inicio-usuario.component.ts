import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  public EstadoDenuncia(){
    window.alert('El estado de su denuncia es: ...');
  }

}
