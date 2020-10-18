import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { contacto } from '../entities/contacto';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { denuncia } from '../entities/denuncia';
import { funcionario } from '../entities/funcionario';
import { compromiso } from '../entities/compromiso';
import { prueba } from '../entities/prueba';
import { hechos } from '../entities/hechos';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { centrosescolares } from '../entities/centros_escolares';
import { map, startWith } from 'rxjs/operators';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { correo } from '../entities/correo';
import { gestiondenuncia } from '../entities/gestiondenuncia';

export interface ISelector {
  value: string;
}

@Component({
  selector: 'app-first-page',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {

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

  funcionario: funcionario = { 
    nombreFuncionario:'',
    tipoDocumento:'',
    numeroDocumento:'',
    cargo:'',
    laboraEntidad: ''
  };

  compromiso: compromiso = {
    compromiso: 'SI'
  };

  prueba: prueba = {
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
    jcd:'',
    idFirmaRepresentantecsj:1,
    idFirmaRepresentantemined:1
  }

  contacto: contacto = { 
    nombreCiudadano:'',
    apellidoCiudadano:'',
    tipoDocumento:'',
    numeroDocumento:0,
    fechaNacimiento:null,
    departamentoCiudadano:''
  };

  public CentrosEscolares: centrosescolares [] = [{ codigoCe:0,direccionCe:'Ninguna',directorCe:'Ninguno',nombreCe:'Ninguno', departamentoCe:'Ninguno'}];
  public CentroEscolar: centrosescolares = {codigoCe:0,direccionCe:'A',directorCe:'B',nombreCe:'C',departamentoCe:'D'};

  //Variables necesarias
  disabledBtnUpload: boolean = false;
  step = 0;
  filteredOptions: Observable<centrosescolares[]>;

  datosFormGroup: FormGroup;

  nombreFC = new FormControl({value:null,disabled:true});
  apellidoFC = new FormControl({value:null,disabled:true});
  departamentoFC = new FormControl({value:null,disabled:true});
  emailFC = new FormControl({value:null,disabled:false}, [Validators.required, Validators.email]);
  documentoFC = new FormControl({value:null,disabled:false}, Validators.compose([Validators.required,Validators.pattern("[0-9]{8}[-]{1}[0-9]{1}")]));
  tipodocumentoFC = new FormControl({value:null,disabled:false}, Validators.required);
  fechanacimientoFC = new FormControl({value:null,disabled:false}, Validators.required);
  telefonomovilFC = new FormControl({value:null,disabled:false}, Validators.compose([Validators.required, Validators.pattern("[0-9]{8}")]));
  telefonocasaFC = new FormControl({value:'00000000',disabled:false}, Validators.compose([Validators.required, Validators.pattern("[0-9]{1,8}")]));
  direccionFC = new FormControl({value:null,disabled:false}, Validators.required);

  nombreceFC = new FormControl({value:null,disabled:true}, Validators.required);
  directorceFC = new FormControl({value:null,disabled:true}, Validators.required);
  codigoceFC = new FormControl({value:null,disabled:false}, Validators.required);
  departamentoceFC = new FormControl({value:null,disabled:true}, Validators.required);
  direccionceFC = new FormControl({value:null,disabled:true}, Validators.required);

  tipodenunciaFC = new FormControl({value:null,disabled:false}, Validators.required);
  trabajalugarFC = new FormControl({value:null,disabled:false}, Validators.required);
  representantelegalFC = new FormControl({value:null,disabled:false}, Validators.required);
  hechosdescFC = new FormControl({value:null,disabled:false}, Validators.required);
  fechahechosiFC = new FormControl({value:null,disabled:false}, Validators.required);
  fechahechosfFC = new FormControl({value:null,disabled:false}, Validators.required);
  agresionfisicaFC = new FormControl({value:null,disabled:false}, Validators.required);
  agresionverbalFC = new FormControl({value:null,disabled:false}, Validators.required);
  inversionrecuperacionFC = new FormControl({value:0,disabled:false}, Validators.compose([Validators.required,Validators.minLength(0),Validators.maxLength(5),Validators.pattern(/^\d+$/)]));
  otroprocesoFC = new FormControl({value:'NINGUNA',disabled:false}, Validators.required);
  desotroprocesoFC = new FormControl('No se tiene otro proceso',[Validators.required, Validators.minLength(24)]);

  tipodocumentofuncFC = new FormControl({value:null,disabled:false}, Validators.required);
  numerodocumentofuncFC = new FormControl({value:null,disabled:false}, Validators.compose([Validators.required, Validators.minLength(10),Validators.pattern("[0-9]{8}[-]{1}[0-9]{1}")]));
  cargofuncFC = new FormControl({value:null,disabled:false}, Validators.required);
  nombrefuncFC = new FormControl({value:null,disabled:false}, Validators.required);
  laboraentidadfuncFC = new FormControl({value:null,disabled:false}, Validators.required);

  constructor(public dialog: MatDialog, 
    private api: ApiService, 
    private router: Router, 
    private _route: ActivatedRoute,
    public _storage: AngularFireStorage) { 
    //console.log(this._route.snapshot.paramMap.get('compromiso'));
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

  public getErrorEmailMessage() {
    return this.emailFC.hasError('required') ? 'Correo electronico es requerido' : this.emailFC.hasError('email') ? 'No es un correo valido' : '';
  }

  public agregarCero(numero:number){
    if(numero<10) return '0'+numero;
    return numero;
  }

  public complementarce(valor:any){
    this.CentroEscolar = this.CentrosEscolares.find(datos => datos.codigoCe == valor);
    this.directorceFC.setValue(this.CentroEscolar.directorCe);
    this.nombreceFC.setValue(this.CentroEscolar.nombreCe);
    this.direccionceFC.setValue(this.CentroEscolar.direccionCe);
    this.departamentoceFC.setValue(this.CentroEscolar.departamentoCe);
  }

  private _filter(value: string): centrosescolares[] {
    return this.CentrosEscolares.filter(option => option.nombreCe.includes(value));
  }

  ngOnInit() {
    this.datosFormGroup = new FormGroup({
      nombreCtrl: this.nombreFC,
      apellidoCtrl: this.apellidoFC,
      departamentoCtrl: this.departamentoFC,
      emailCtrl: this.emailFC,
      documentoCtrl: this.documentoFC,
      tipodocumentoCtrl: this.tipodocumentoFC,
      fechanacimientoCtrl: this.fechanacimientoFC,
      telefonomovilCtrl: this.telefonomovilFC,
      telefonocasaCtrl: this.telefonocasaFC,
      direccionCtrl: this.direccionFC,
      nombreceCtrl: this.nombreceFC,
      directorceCtrl: this.directorceFC,
      codigoceCtrl: this.codigoceFC,
      departamentoceCtrl: this.departamentoceFC,
      direccionceCtrl: this.direccionceFC,
      tipodenunciaCtrl: this.tipodenunciaFC,
      trabajalugarCtrl: this.trabajalugarFC,
      representantelegalCtrl: this.representantelegalFC,
      hechosdescCtrl: this.hechosdescFC,
      fechahechosiCtrl: this.fechahechosiFC,
      fechahechosfCtrl: this.fechahechosfFC,
      agresionfisicaCtrl: this.agresionfisicaFC,
      agresionverbalCtrl: this.agresionverbalFC,
      inversionrecuperacionCtrl: this.inversionrecuperacionFC,
      otroprocesoCtrl: this.otroprocesoFC,
      desotroprocesoCtrl: this.desotroprocesoFC,
      tipodocumentofuncCtrl: this.tipodocumentofuncFC,
      numerodocumentofuncCtrl: this.numerodocumentofuncFC,
      cargofuncCtrl: this.cargofuncFC,
      nombrefuncCtrl: this.nombrefuncFC,
      laboraentidadfuncCtrl: this.laboraentidadfuncFC
    });
    this.getCentrosEscolares();
    this.filteredOptions = this.codigoceFC.valueChanges.pipe(startWith(''),map(value => this._filter(value)));
  }

  private getCentrosEscolares(){
    try {
      this.api.getCentrosEscolares().subscribe((respuesta) => {
        this.CentrosEscolares.pop();
        this.CentrosEscolares = respuesta;
      });
      
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
            this.nombreFC.setValue(respuesta.nombreCiudadano);
            this.apellidoFC.setValue(respuesta.apellidoCiudadano);
            this.departamentoFC.setValue(respuesta.departamentoCiudadano);
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
          contenido: `La denuncia fue registrada con exito, te recordamos que tu correlativo es: ${this.denuncia.noExpediente}, gracias por ser parte de este proceso.`
          //contenido: `${this.denuncia.nombreCiudadano} ${this.denuncia.apellidoCiudadano}, tu número de expediente es: ${this.denuncia.noExpediente}, te hemos enviado el siguiente enlace para que confirmes tu denuncia: escribe http:// en tu navegador y seguido localhost/confirmar/${this.denuncia.idDenuncia} , lo enviamos de esta forma para que no se considere spam. Sino has utilizado tu correo para realizar esta denuncia ignora este mensaje. También te adjuntamos el enlace que contiene el compromiso que aceptaste, recuerda presentarlo el día de la audiencia. https:// firebasestorage.googleapis.com/v0/b/sigd-be78b.appspot.com/o/Compromisos%20del%20ciudadano.pdf?alt=media&token=edef1aba-f7c7-4300-a92b-5a4f6c5fa3de.pdf `
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
        codRegistro: `UI.${this.agregarCero(date.getDate())}-${this.agregarCero(date.getMonth()+1)}-${date.getFullYear()}.${this.agregarCero(date.getHours())}-${this.agregarCero(date.getMinutes())}.${this.documentoFC.value}`
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado!=null) {
        this.denuncia.nombreCiudadano = this.nombreFC.value;
        this.denuncia.apellidoCiudadano = this.apellidoFC.value;
        this.denuncia.departamentoCiudadano = this.departamentoFC.value;
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
        this.hechos.tipoDenuncia = this.tipodenunciaFC.value;
        this.hechos.trabajaLugar = this.trabajalugarFC.value;
        this.hechos.representanteLegal = this.representantelegalFC.value;
        this.hechos.descripcionHechos = this.hechosdescFC.value;
        this.hechos.fechaIniHechos = this.fechahechosiFC.value;
        this.hechos.fechaFinHechos = this.fechahechosfFC.value;
        this.hechos.agresionFisica = this.agresionfisicaFC.value;
        this.hechos.agresionVerbal = this.agresionverbalFC.value;
        this.hechos.inversionRecuperacion = this.inversionrecuperacionFC.value;
        this.hechos.otroProceso = this.otroprocesoFC.value;
        this.hechos.desOtroProceso = this.desotroprocesoFC.value;
        this.gestion.noExpediente = resultado.codRegistro;
        this.gestion.jcd = this.departamentoceFC.value;
        this.gestion.nombreDenunciante = this.nombreFC.value+" "+this.apellidoFC.value;
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
      this.tipodocumentofuncFC.setValue(resultado.tipoDocumento);
      this.nombrefuncFC.setValue(resultado.nombreFuncionario);
      this.numerodocumentofuncFC.setValue(resultado.numeroDocumento);
      this.cargofuncFC.setValue(resultado.cargo);
      this.laboraentidadfuncFC.setValue(resultado.laboraEntidad);
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
export class DialogCargarDocumentoComponent implements OnInit {

  //Variables
  uploadPercent: Observable<number>;
  fileToUpload: File = null;
  descripcionFC = new FormControl({value:null,disabled:false}, Validators.required);
  anexopaginaFC = new FormControl({value:'Ninguno',disabled:false}, Validators.required);
  ubicacionFC = new FormControl({value:'',disabled:false}, Validators.required);
  archivoFC = new FormControl({value:null,disabled:false}, Validators.required);
  pruebaFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCargarDocumentoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: prueba, private _storage: AngularFireStorage){}

  ngOnInit(): void {
    this.pruebaFormGroup = new FormGroup({
      descripcionCtrl: this.descripcionFC,
      anexopaginaCtrl: this.anexopaginaFC,
      ubicacionCtrl: this.ubicacionFC,
      archivoCtrl: this.archivoFC
    });
  }

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
    { this.data.archivo = ruta; this.archivoFC.setValue(ruta); }))).subscribe();
  }

  CloseDialog(){
    this.data.descripcion = this.descripcionFC.value;
    this.data.anexoPagina = this.anexopaginaFC.value;
    this.data.minutoEvidencia = this.ubicacionFC.value;
    this.data.archivo = this.archivoFC.value
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'dialog-funcionario.component',
  templateUrl: './dialog-funcionario.html',
  styleUrls: ['./denuncia.component.css']
})
export class DialogFuncionarioComponent implements OnInit {

  tipodocumentoFC = new FormControl({value:null,disabled:false}, Validators.required);
  numerodocumentoFC = new FormControl({value:null,disabled:false}, Validators.compose([Validators.required, Validators.minLength(10),Validators.pattern("[0-9]{8}[-]{1}[0-9]{1}")]));
  cargoFC = new FormControl({value:null,disabled:false}, Validators.required);
  nombrefuncionarioFC = new FormControl({value:null,disabled:false}, Validators.required);
  laboraentidadFC = new FormControl({value:null,disabled:false}, Validators.required);
  funcionarioFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: funcionario) {}

  ngOnInit(): void {
    this.funcionarioFormGroup = new FormGroup({
      tipodocumentoCtrl: this.tipodocumentoFC,
      numerodocumentoCtrl: this.numerodocumentoFC,
      cargoCtrl: this.cargoFC,
      nombrefuncionarioCtrl: this.nombrefuncionarioFC,
      laboraentidadCtrl: this.laboraentidadFC
    });
    if(this.data.tipoDocumento!=null && this.data.numeroDocumento!=null && this.data.nombreFuncionario!=null && this.data.cargo!=null && this.data.laboraEntidad!=null){
      this.tipodocumentoFC.setValue(this.data.tipoDocumento);
      this.numerodocumentoFC.setValue(this.data.numeroDocumento);
      this.cargoFC.setValue(this.data.cargo);
      this.nombrefuncionarioFC.setValue(this.data.nombreFuncionario);
      this.laboraentidadFC.setValue(this.data.laboraEntidad);
    }
  }

  CloseDialog(){
    this.data.tipoDocumento = this.tipodocumentoFC.value;
    this.data.numeroDocumento = this.numerodocumentoFC.value;
    this.data.cargo = this.cargoFC.value;
    this.data.nombreFuncionario = this.nombrefuncionarioFC.value;
    this.data.laboraEntidad = this.laboraentidadFC.value;
    this.dialogRef.close(this.data);
  }

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
