import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  nombreUsuario: string = "";

  constructor(private _router:Router, private auth:AuthService) { }

  ngOnInit() {
    this.nombreUsuario = this.auth.getNombre();
  }

  public CerrarSesion(){
    this.auth.InvalidarAutenticacion();
    this._router.navigate(['/inicio-usuario']);
  }

}
