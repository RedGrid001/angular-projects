import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { denuncia } from '../entities/denuncia';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  /* nombre = new FormControl('Josue', Validators.required);
  apellido = new FormControl('Castro', Validators.required);
  tipodocumento = new FormControl('DUI', Validators.required);
  numerodocumento = new FormControl('124578965', Validators.required);
  fechanacimiento = new FormControl('05/02/2000', Validators.required);
  departamento = new FormControl('San Miguel', Validators.required);
  telefonomovil = new FormControl('78459652', Validators.required);
  telefonocasa = new FormControl('26654152', Validators.required);
  email = new FormControl('josue@gmail.com', [Validators.required, Validators.email]);
  direccion = new FormControl('Barrio San Simon, calle Ronulfo Romero, casa #15', Validators.required); */
  @Input() datosUser: denuncia = {
    idDenuncia: 0,
    nombreCiudadano: '',
    apellidoCiudadano: '',
    tipoDocumento: '',
    numeroDocumento:0,
    fechaNacimiento: null,
    departamentoCiudadano: '',
    direccionCiudadano: '',
    telefonoMovil:0,
    telefonoCasa:0,
    emailDenunciante: '',
    noExpediente: '',
    compromiso: [],
    hechos: [],
    prueba: [],
    funcionario: [],
    gestionDenuncia: []
  }

  constructor(private authUser:AuthService, private api:ApiService) { }

  ngOnInit() {
    try {
      this.api.getDenunciaById(this.authUser.getId()).subscribe((respuesta) => {
        this.datosUser = respuesta;
        /* this.nombre.setValue(respuesta.nombreCiudadano);
        this.apellido.setValue(respuesta.apellidoCiudadano);
        this.tipodocumento.setValue(respuesta.tipoDocumento);
        this.numerodocumento.setValue(respuesta.numeroDocumento);
        this.fechanacimiento.setValue(respuesta.fechaNacimiento);
        this.departamento.setValue(respuesta.departamentoCiudadano);
        this.telefonomovil.setValue(respuesta.telefonoMovil);
        this.telefonocasa.setValue(respuesta.telefonoCasa);
        this.email.setValue(respuesta.emailDenunciante);
        this.direccion.setValue(respuesta.direccionCiudadano); */
      },(err) => this.api.handleError(err), () => {});
    } catch (error) {
      this.api.handleError(error);
    }
  }

}
