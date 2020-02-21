import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

export interface Documento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sdcmined-User';

  step = 0;

  email = new FormControl('', [Validators.required, Validators.email]);
  dui = new FormControl('', Validators.required);
  tipodocumento = new FormControl('', Validators.required);
  fechanacimiento = new FormControl('', Validators.required);
  tmovil = new FormControl('', Validators.required);
  direccion = new FormControl('', Validators.required);

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  documentos: Documento[] = [
    {value: 'dui-0', viewValue: 'DUI'},
    {value: 'nit-1', viewValue: 'NIT'},
    {value: 'licencia-2', viewValue: 'LICENCIA'}
  ];
  getErrorNacimientoMessage(){
    return this.fechanacimiento.hasError('required') ? 'Debes ingresar la fecha' : ''
  }

/*   getErrorTipoDocMessage(){
    return this.tipodocumento.hasError('required') ? 'Debes elegir un tipo' : ''
  } */

  getErrorDocumentMessage(){
    return this.dui.hasError('required') ? 'Debes ingresar el numero' : ''
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Correo electronico es requerido' :
        this.email.hasError('email') ? 'No es un correo valido' :
            '';
  }
}
