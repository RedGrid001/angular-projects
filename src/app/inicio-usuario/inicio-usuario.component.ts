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
  duiCtrl = new FormControl({value:null, disabled: false}, [Validators.required, Validators.minLength(10)]);
  correlativoCtrl = new FormControl({value:null, disabled:false}, [Validators.required, Validators.minLength(26)]);

  constructor(private _router: Router, private auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.inicioFormGroup = new FormGroup({
      duiCtrl: this.duiCtrl,
      correlativoCtrl: this.correlativoCtrl
    })
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
