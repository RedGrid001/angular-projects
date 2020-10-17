import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {

  inicioFormGroup: FormGroup;
  documentoFC = new FormControl({value:null, disabled: false}, Validators.compose([Validators.required,Validators.pattern("[0-9]{8}[-]{1}[0-9]{1}")]));
  correlativoFC = new FormControl({value:null, disabled:false}, Validators.compose([Validators.required,Validators.pattern("[A-Z]{2}[.]{1}[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}[.]{1}[0-9]{2}[-]{1}[0-9]{2}[.]{1}[0-9]{8}[-]{1}[0-9]{1}")]));

  constructor(private _router: Router, private auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.auth.getAutenticacionEstado) this._router.navigate(['/inicio']);
    this.inicioFormGroup = new FormGroup({
      documentoCtrl: this.documentoFC,
      correlativoCtrl: this.correlativoFC
    });
    /* this.inicioFormGroup = this._formBuilder.group({
      duiCtrl: ['',Validators.required],
      correlativoCtrl: ['',Validators.required]
    }) */
  }

  public IniciarSesion(documento,expediente){
    this.auth.AutenticacionUsuario(documento,expediente).then((respuesta) => {
      if(respuesta!=null){
        this._router.navigate(['/inicio']);
        this.AbrirSnackBar('DATOS CORRECTOS','OK'); 
      } else{ 
        this.AbrirSnackBar('NUMERO DE DUI O CORRELATIVO','NO COINCIDEN');
      }
    }).catch((err) => this.AbrirSnackBar(err.message,err.code));
  }

  private AbrirSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }


}
