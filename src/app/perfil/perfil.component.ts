import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre = new FormControl('Josue', Validators.required);
  apellido = new FormControl('Castro', Validators.required);
  tipodocumento = new FormControl('DUI', Validators.required);
  numerodocumento = new FormControl('124578965', Validators.required);
  fechanacimiento = new FormControl('05/02/2000', Validators.required);
  departamento = new FormControl('San Miguel', Validators.required);
  telefonomovil = new FormControl('78459652', Validators.required);
  telefonocasa = new FormControl('26654152', Validators.required);
  email = new FormControl('josue@gmail.com', [Validators.required, Validators.email]);
  direccion = new FormControl('Barrio San Simon, calle Ronulfo Romero, casa #15', Validators.required);

  constructor() { }

  ngOnInit() {
  }

}
