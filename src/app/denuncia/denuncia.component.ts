import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { centrosescolares } from '../entities/centros_escolares';
import { map, startWith } from 'rxjs/operators';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { correo } from '../entities/correo';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { isString } from 'util';

export interface ISelector {
  value: string;
}

@Component({
  selector: 'app-first-page',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {

  //@ViewChild() content: ElementRef;

  denuncia: denuncia = {
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
  };

  @Input() funcionario: funcionario = { 
    nombreFuncionario:'',
    tipoDocumento:0,
    numeroDocumento:0,
    cargo:'',
    laboraEntidad: ''
  };

  compromiso: compromiso = {
    compromiso: 'SI'
  };

  @Input() prueba: prueba = {
    descripcion: '',
    anexoPagina: '',
    minutoEvidencia: '',
    archivo: ''
  };

  hechos: hechos = {
    tipoDenuncia: '',
    trabajaLugar: '',
    representanteLegal: '',
    codCe:0,
    nombreCe: '',
    directorCe: '',
    departamentoCe:'',
    direccionCe:'',
    descripcionHechos: '',
    fechaIniHechos: null,
    fechaFinHechos: null,
    agresionFisica: '',
    agresionVerbal: '',
    inversionRecuperacion: 0,
    otroProceso: 'NINGUNA',
    desOtroProceso: ''
  };

  gestion: gestiondenuncia = {
    idDenuncia:0,
    noExpediente:'',
    nombreDenunciante:'',
    estado:0,
    archivado:0,
    fechaAudiencia: null,
    lugar:'',
    generalidades:'',
    resolucion:'',
    idFirmaRepresentantedocentes:1,
    portalTransparencia:'',
    fechaModificacion:new Date(),
    fechaRegistro:new Date(),
    usuarioModificacion:'USUARIO REGISTRO',
    jdc:'DEPARTAMENTO',
    idFirmaRepresentantecsj:1,
    idFirmaRepresentantemined:1
  }

  public CentrosEscolares: centrosescolares [] = [{ codigoCe:1,direccionCe:'Ninguna',directorCe:'Ninguno',nombreCe:'Ninguno', departamentoCe:'Ninguno'}];
  public CentroEscolar: centrosescolares = {codigoCe:0,direccionCe:'A',directorCe:'B',nombreCe:'C',departamentoCe:'D'};

  //Variables necesarias
  disabledBtnUpload: boolean = false;
  step = 0;
  filteredOptions: Observable<centrosescolares[]>;

  emailFC = new FormControl('', [Validators.required, Validators.email]);
  documentoFC = new FormControl('', Validators.required);
  tipodocumentoFC = new FormControl('', Validators.required);
  fechanacimientoFC = new FormControl('', Validators.required);
  telefonomovilFC = new FormControl('', Validators.required);
  telefonocasaFC = new FormControl('');
  direccionFC = new FormControl('', Validators.required);

  nombreceFC = new FormControl('', Validators.required);
  directorceFC = new FormControl('', Validators.required);
  codigoceFC = new FormControl('', Validators.required);
  departamentoceFC = new FormControl('', Validators.required);
  direccionceFC = new FormControl('', Validators.required);
  hechosdescFC = new FormControl('', Validators.required);
  fechahechosiFC = new FormControl('', Validators.required);
  fechahechosfFC = new FormControl('', Validators.required);

  @Input() contacto: contacto = ({ 
    nombreCiudadano:'',
    apellidoCiudadano:'',
    tipoDocumento:'',
    numeroDocumento:0,
    fechaNacimiento:null,
    departamentoCiudadano:''
  });

  constructor(public dialog: MatDialog, 
    private api: ApiService, 
    private router: Router, 
    private _route: ActivatedRoute,
    public _storage: AngularFireStorage,
    private _snackBar: MatSnackBar) { 
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
    {value: 'NIE'}
  ];

  entidades: ISelector[] = [
    {value: 'NINGUNA'},
    {value: 'PNC'},
    {value: 'JUNTA'},
    {value: 'FISCALIA'}
  ];

  getErrorEmailMessage() {
    return this.emailFC.hasError('required') ? 'Correo electronico es requerido' :
        this.emailFC.hasError('email') ? 'No es un correo valido' : '';
  }

  public complementarce(valor:any){
    console.log(valor);
    this.CentroEscolar = this.CentrosEscolares.find(datos => datos.codigoCe == valor);
    this.directorceFC.setValue(this.CentroEscolar.directorCe);
    this.nombreceFC.setValue(this.CentroEscolar.nombreCe);
    //this.codigoceFC.setValue(this.CentroEscolar.codigoCe);
    this.direccionceFC.setValue(this.CentroEscolar.direccionCe);
    this.departamentoceFC.setValue(this.CentroEscolar.departamentoCe);
  }

  private _filter(value: string): centrosescolares[] {
    //const filterValue = value.toLowerCase();
    return this.CentrosEscolares.filter(option => option.nombreCe.includes(value));
  }

  ngOnInit() {
    this.getCentrosEscolares();
    this.filteredOptions = this.codigoceFC.valueChanges.pipe(startWith(''),map(value => this._filter(value)));
  }

  private getCentrosEscolares(){
    try {
      this.api.getCentrosEscolares().subscribe((respuesta) => {
        //this.CentrosEscolares.pop();
        this.CentrosEscolares = respuesta;
        console.log(this.CentrosEscolares);
      })
      
    } catch (error) {
      this.api.handleError(error);
    }
  }

  public getContacto(numeroDocumento: number,tipoDocumento: string, fechaNacimiento: Date){
    var date = new Date(fechaNacimiento);
    var fechaFormato = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`; //Con Formato YYYY/MM/DD en string
    try{
       this.api.getContacto(numeroDocumento,tipoDocumento,fechaFormato).subscribe((respuesta: contacto) => {
          if(respuesta!=null){
            this.contacto = respuesta;
            this.denuncia.nombreCiudadano = respuesta.nombreCiudadano;
            this.denuncia.apellidoCiudadano = respuesta.apellidoCiudadano;
            this.denuncia.departamentoCiudadano = respuesta.departamentoCiudadano;
            this.api.AbrirSnackBar('DATOS ENCONTRADOS CON EXITO','OK');
          }else{
            this.api.AbrirSnackBar('DATOS NO ENCONTRADOS','OK');
          }
        },(err) => this.api.handleError(err), () => {});
    } catch(error){
      this.api.handleError(error);
    }
  }

  public postDenuncia(denuncia:denuncia){
    try {
      this.api.postDenuncia(denuncia).subscribe((respuesta: denuncia) => { this.denuncia.idDenuncia = respuesta.idDenuncia; console.log(respuesta); },
      (err) => this.api.handleError(err), () => { 
        this.api.AbrirSnackBar('REGISTRAR DENUNCIA','COMPLETADO');

        var dataemail: correo = {
          emailEmisor: 'sadeuesmined@hotmail.com',
          passwordEmisor: 'S1a2D3e4',
          emailReceptor: this.denuncia.emailDenunciante,
          asunto: 'Correo para confirmar denuncia',
          contenido: `${this.denuncia.nombreCiudadano} ${this.denuncia.apellidoCiudadano}, tu número de expediente es: ${this.denuncia.noExpediente}, te hemos enviado el siguiente enlace para que confirmes tu denuncia: escribe http:// en tu navegador y seguido localhost/confirmar/${this.denuncia.idDenuncia} , lo enviamos de esta forma para que no se considere spam. Sino has utilizado tu correo para realizar esta denuncia ignora este mensaje. También te adjuntamos el enlace que contiene el compromiso que aceptaste, recuerda presentarlo el día de la audiencia. https:// firebasestorage.googleapis.com/v0/b/sigd-be78b.appspot.com/o/Compromisos%20del%20ciudadano.pdf?alt=media&token=edef1aba-f7c7-4300-a92b-5a4f6c5fa3de.pdf `
        } 
        this.postCorreo('Simple',dataemail);
      
      });
    } catch (error) {
      this.api.handleError(error);
    }  
  }

  public postCorreo(tipo:string, correo:correo){
    try {
      this.api.postCorreo(tipo,correo).subscribe(resultado => {},(err) => this.api.handleError(err),() => { this.router.navigate(['/resumen']); } )
    } catch (error) {
      this.api.handleError(this.api);
    }
  }

  DialogConfirmacion(){
    let date = new Date();
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: {
        codRegistro: `UI.${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.${date.getHours()}-${date.getMinutes()}.${this.documentoFC.value}`
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado!=null) {
        this.denuncia.tipoDocumento = this.tipodocumentoFC.value;
        this.denuncia.numeroDocumento = this.documentoFC.value;
        this.denuncia.fechaNacimiento = this.fechanacimientoFC.value;
        this.denuncia.telefonoMovil = this.telefonomovilFC.value;
        this.denuncia.telefonoCasa = this.telefonocasaFC.value;
        this.denuncia.emailDenunciante = this.emailFC.value;
        this.denuncia.direccionCiudadano = this.direccionFC.value;
        this.denuncia.noExpediente = resultado.codRegistro;
        this.hechos.nombreCe = this.nombreceFC.value;
        this.hechos.directorCe = this.directorceFC.value;
        this.hechos.codCe = this.codigoceFC.value;
        this.hechos.departamentoCe = this.departamentoceFC.value;
        this.hechos.direccionCe = this.direccionceFC.value;
        this.hechos.descripcionHechos = this.hechosdescFC.value;
        this.hechos.fechaIniHechos = this.fechahechosiFC.value;
        this.hechos.fechaFinHechos = this.fechahechosfFC.value;
        this.gestion.noExpediente = resultado.codRegistro;
        this.gestion.jdc = this.departamentoceFC.value;
        this.gestion.nombreDenunciante = this.denuncia.nombreCiudadano+" "+this.denuncia.apellidoCiudadano;
        this.denuncia.gestionDenuncia.splice(0,1,this.gestion);
        this.denuncia.compromiso.splice(0,1,this.compromiso);
        this.denuncia.hechos.splice(0,1,this.hechos);
        this.postDenuncia(this.denuncia);
      } else {
        this.api.AbrirSnackBar('REGISTRAR DENUNCIA','CANCELADO');
      }
    });
  }

  DialogDocumento(){
    const dialogRef = this.dialog.open(DialogCargarDocumentoComponent, {
      data: this.prueba
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado!=null) {
        this.prueba.descripcion = resultado.descripcion;
        this.prueba.anexoPagina = resultado.anexoPagina;
        this.prueba.minutoEvidencia = resultado.minutoEvidencia;
        this.prueba.archivo = resultado.archivo;
        this.denuncia.prueba.splice(0,1,this.prueba);
        this.api.AbrirSnackBar('AGREGAR PRUEBA','REALIZADO');
        this.disabledBtnUpload = true;
      }else {
        this.api.AbrirSnackBar('AGREGAR PRUEBA','CANCELADO')
      }
    });
  }

  DialogFuncionario(): void {
    const dialogRef = this.dialog.open(DialogFuncionarioComponent, {
      width: '400px',
      data: this.funcionario
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado!=null) {
      this.funcionario.tipoDocumento = resultado.tipoDocumento;
      this.funcionario.nombreFuncionario = resultado.nombreFuncionario;
      this.funcionario.numeroDocumento = resultado.numeroDocumento;
      this.funcionario.cargo = resultado.cargo;
      this.funcionario.laboraEntidad = resultado.laboraEntidad;
      this.denuncia.funcionario.splice(0,1,this.funcionario);
      this.api.AbrirSnackBar('AGREGAR FUNCIONARIO','REALIZADO');
      } else {
        this.api.AbrirSnackBar('AGREGAR FUNCIONARIO','CANCELADO');
      }
    });
  }

  DialogDescargar() {
    const dialogRef = this.dialog.open(DialogDescargarComponent, {
      data: this.denuncia
    });
  }

}

@Component({
  selector:'dialog-confirmacion.component',
  templateUrl:'./dialog-confirmacion.html',
  styleUrls: ['./denuncia.component.css']
})
export class DialogConfirmacionComponent{

  constructor(public dialogRef: MatDialogRef<DialogConfirmacionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data){}

}

@Component({
  selector: 'dialog-cargar-documento.component',
  templateUrl: './dialog-cargar-documento.html',
  styleUrls: ['./denuncia.component.css']
})
export class DialogCargarDocumentoComponent {

  //Variables
  uploadPercent: Observable<number>;
  fileToUpload: File = null;

  constructor(public dialogRef: MatDialogRef<DialogCargarDocumentoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: prueba, private _storage: AngularFireStorage){}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.CargarArchivo(this.fileToUpload);
  }

  CargarArchivo(file: File) {
    const id = Math.random().toString(36).substring(2);
    const filePath = 'files/archivo_'+id;
    const storageRef = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=>storageRef.getDownloadURL().subscribe((ruta:string) => 
    { this.data.archivo = ruta; }))).subscribe();
  }
}

@Component({
  selector: 'dialog-funcionario.component',
  templateUrl: './dialog-funcionario.html',
  styleUrls: ['./denuncia.component.css']
})
export class DialogFuncionarioComponent {

  constructor(public dialogRef: MatDialogRef<DialogFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: funcionario) {}

}

@Component({
  selector: 'dialog-descargar.component',
  templateUrl: './dialog-descargar.html',
  styleUrls: ['./denuncia.component.css']
})

export class DialogDescargarComponent {

  filepdf: File;

  constructor(public dialogRef: MatDialogRef<DialogDescargarComponent>, @Inject(MAT_DIALOG_DATA) public data: denuncia) {}

  public DescargarPDF(){

    var element = document.getElementById('contenido');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      //var imgData = canvas.toDataURL('image/png');
      //var imgWidth = 140;
      var doc = new jsPDF('p','mm',[279.4,215.9]);
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(canvas,5,5,0,0);
      doc.save("denunciainf.pdf");

    });

  }

}
