import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { contacto } from '../entities/contacto';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { denuncia } from '../entities/denuncia';
import { funcionario } from '../entities/funcionario';
import { compromiso } from '../entities/compromiso';
import { prueba } from '../entities/prueba';
import { hechos } from '../entities/hechos';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

export interface ISelector {
  value: string;
}

export interface ICargarDocumento {
  descripcion: string;
  anexo: string;
  ubicacion: string;
  archivo: File;
}

export interface IFuncionario {
  tipodocumento: string;
  nombrefuncionario: string;
  numerodocumento: string;
  cargo: string;
  respuesta: boolean;
}

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  title = 'Home-Page';

  denuncia: denuncia = {
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
    funcionario: []
  };

  @Input() funcionario: funcionario = { 
    nombreFuncionario:'',
    tipoDocumento:0,
    numeroDocumento:0,
    cargo:'',
    respuesta: ''
  };

  compromiso: compromiso = {
    compromiso: 'S'
  };

  @Input() prueba: prueba = {
    descripcion: '',
    anexoPagina: '',
    minutoEvidencia: '',
    archivo: ''
  };

  hechos: hechos = {
    tipoDenunciaP: '',
    tipoDenunciaS: '',
    tipoDenunciaT: '',
    trabajaLugar: '',
    representanteLegal: '',
    codCe:0,
    nombreCe: '',
    directorCe: '',
    descripcionHechos: '',
    fechaIniHechos: null,
    fechaFinHechos: null,
    agresionFisica: '',
    agresionVerbal: '',
    inversionRecuperacion: 0,
    otroProceso: '',
    desOtroProceso: ''
  };

  //Variables necesarias
  file: File = null;
  disabledBtnUpload: boolean = false;
  step = 0;

  emailFC = new FormControl('', [Validators.required, Validators.email]);
  documentoFC = new FormControl('', Validators.required);
  tipodocumentoFC = new FormControl('', Validators.required);
  fechanacimientoFC = new FormControl('', Validators.required);
  telefonomovilFC = new FormControl('', Validators.required);
  telefonocasaFC = new FormControl('');
  direccionFC = new FormControl('', Validators.required);

  institucionFC = new FormControl('', Validators.required);
  directorFC = new FormControl('', Validators.required);
  codceFC = new FormControl('', Validators.required);
  hechosdescFC = new FormControl('', Validators.required);
  fechahechosiFC = new FormControl('', Validators.required);
  fechahechosfFC = new FormControl('', Validators.required);

  @Input() contacto: contacto = ({ 
    nombreCiudadano:"",
    apellidoCiudadano:"",
    tipoDocumento:"",
    numeroDocumento:0,
    fechaNacimiento:null,
    departamentoCiudadano:""
  });

  constructor(public dialog: MatDialog, 
    private api: ApiService, 
    private router: Router, 
    private _route: ActivatedRoute,
    public _storage: AngularFireStorage) { 
    console.log(this._route.snapshot.paramMap.get('compromiso'));
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  documentos: ISelector[] = [
    {value: 'DUI'},
    {value: 'NIT'},
    {value: 'LICENCIA'}
  ];

  entidades: ISelector[] = [
    {value: 'PNC'},
    {value: 'JUNTA'},
    {value: 'FISCALIA'}
  ];

  getErrorEmailMessage() {
    return this.emailFC.hasError('required') ? 'Correo electronico es requerido' :
        this.emailFC.hasError('email') ? 'No es un correo valido' : '';
  }

  ngOnInit() {
    
  }

  public getContacto(id: any){
    try{
       this.api.getContacto(id).subscribe((respuesta: contacto) => {
          this.contacto = respuesta;
          this.denuncia.nombreCiudadano = respuesta.nombreCiudadano;
          this.denuncia.apellidoCiudadano = respuesta.apellidoCiudadano;
          this.denuncia.departamentoCiudadano = respuesta.departamentoCiudadano;
        });

    } catch(error){
      this.handleError(error);
    }
  }

  public postDenuncia(){
    try {
      this.denuncia.compromiso.splice(0,1,this.compromiso);
      this.denuncia.hechos.splice(0,1,this.hechos);
      this.api.postDenuncia(this.denuncia).subscribe((respuesta: denuncia) => {
        console.log(respuesta);
      });
    } catch (error) {
      this.handleError(error);
    }  
  }

  DialogConfirmacion(){
    let date = new Date();
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: {
        codRegistro: `UI.${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.${date.getHours()}-${date.getMinutes()}.${this.documentoFC.value}`,
        fechaPlazo:'30/12/2020'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.denuncia.tipoDocumento = this.tipodocumentoFC.value;
        this.denuncia.numeroDocumento = this.documentoFC.value;
        this.denuncia.fechaNacimiento = this.fechanacimientoFC.value;
        this.denuncia.telefonoMovil = this.telefonomovilFC.value;
        this.denuncia.telefonoCasa = this.telefonocasaFC.value;
        this.denuncia.emailDenunciante = this.emailFC.value;
        this.denuncia.direccionCiudadano = this.direccionFC.value;
        this.denuncia.noExpediente = result.codRegistro;
        this.hechos.nombreCe = this.institucionFC.value;
        this.hechos.directorCe = this.directorFC.value;
        this.hechos.codCe = this.codceFC.value;
        this.hechos.descripcionHechos = this.hechosdescFC.value;
        this.hechos.fechaIniHechos = this.fechahechosiFC.value;
        this.hechos.fechaFinHechos = this.fechahechosfFC.value;
        this.postDenuncia();
        this.router.navigate(['/resumen']);
      }
    });
  }

  DialogDocumento(){
    const dialogRef = this.dialog.open(DialogCargarDocumentoComponent, {
      data: {descripcion: this.prueba.descripcion,anexo: this.prueba.anexoPagina, ubicacion: this.prueba.minutoEvidencia, archivo: this.prueba.archivo}
    });

    dialogRef.afterClosed().subscribe(resultado => {
      this.prueba.descripcion = resultado.descripcion;
      this.prueba.anexoPagina = resultado.anexo;
      this.prueba.minutoEvidencia = resultado.ubicacion;
      if (resultado.archivo!=null) {
        this.CargarArchivo(resultado.archivo);
        this.denuncia.prueba.splice(0,1,this.prueba);
      }     
      //console.log(this.denuncia.pruebas);
      if (resultado.archivo!) {
        this.disabledBtnUpload = true;
      }
      
    });
  }

  DialogFuncionario(): void {
    const dialogRef = this.dialog.open(DialogFuncionarioComponent, {
      width: '400px',
      data: {
        tipodocumento: this.funcionario.tipoDocumento, 
        nombrefuncionario: this.funcionario.nombreFuncionario, 
        numerodocumento: this.funcionario.numeroDocumento, 
        cargo: this.funcionario.cargo, 
        respuesta: this.funcionario.respuesta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.funcionario.tipoDocumento = result.tipodocumento;
      this.funcionario.nombreFuncionario = result.nombrefuncionario;
      this.funcionario.numeroDocumento = result.numerodocumento;
      this.funcionario.cargo = result.cargo;
      this.funcionario.respuesta = result.respuesta;
      this.denuncia.funcionario.splice(0,1,this.funcionario);
      //console.log(this.denuncia.funcionarios);
    });
  }

  CargarArchivo(file: File) {
    this.file = file;
    const id = Math.random().toString(36).substring(2);
    const filePath = 'files/archivo_'+id;
    const storageRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, this.file);
    task.snapshotChanges().pipe(finalize(()=>storageRef.getDownloadURL().subscribe((ruta:string) => 
    { this.prueba.archivo = ruta; }))).subscribe();
  }

  handleError(error){
    let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  }

}

@Component({
  selector:'dialog-confirmacion.component',
  templateUrl:'./dialog-confirmacion.html',
  styleUrls: ['./first-page.component.css']
})
export class DialogConfirmacionComponent{
  constructor(public dialogRef: MatDialogRef<DialogConfirmacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data){}
}

@Component({
  selector: 'dialog-cargar-documento.component',
  templateUrl: './dialog-cargar-documento.html',
  styleUrls: ['./first-page.component.css']
})
export class DialogCargarDocumentoComponent {

  constructor(public dialogRef: MatDialogRef<DialogCargarDocumentoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ICargarDocumento){}

  handleFileInput(files: FileList) {
    this.data.archivo = files.item(0);
  }
}

@Component({
  selector: 'dialog-funcionario.component',
  templateUrl: './dialog-funcionario.html',
  styleUrls: ['./first-page.component.css']
})
export class DialogFuncionarioComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFuncionario) {}

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
