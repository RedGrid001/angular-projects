import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface Entidades {
  value: string;
  viewValue: string;
}
export interface DialogData {
  codRegistro: string;
  fechaPlazo: string;
}

export interface ModalDocumentoData {
  descripcionD: string;
  anexoD: string;
  ubicacionD: string;
  archivoD: File;
}

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  //Variables
  RegistroAct: boolean;
  descripcionD: string;
  anexoD: string;
  ubicacionD: string;
  archivoD: File = null;

  fileToUpload: File = null;

  disabled: boolean = false;

  entidades: Entidades[] = [
    {value: 'pnc', viewValue: 'PNC'},
    {value: 'junta', viewValue: 'Junta'},
    {value: 'fiscalia', viewValue: 'Fiscalia'}
  ];

  institucion = new FormControl('', Validators.required);
  director = new FormControl('', Validators.required);
  identificacionce = new FormControl('', Validators.required);
  hechosdesc = new FormControl('', Validators.required);
  fechahechosi = new FormControl('', Validators.required);
  fechahechosf = new FormControl('', Validators.required);


  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  openDialogDatos(){
    const dialogRef = this.dialog.open(ModalDatosAlmacenadosComponent, {
      data: {codRegistro: 'UI.2014.1132316',fechaPlazo:'22/8/2014'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.RegistroAct = result;
      console.log('Resultado:'+result);
      if (this.RegistroAct) {
        this.router.navigate(['/resumen']);
      }
    });

  }

  openDialogDocumento(){
    const dialogDocRef = this.dialog.open(ModalSubirDocumentoComponent, {
      data: {descripcionD: '',anexoD: '', ubicacionD: '', archivoD: ''}
    });

    dialogDocRef.afterClosed().subscribe(resultado => {
      this.descripcionD = resultado.descripcionD;
      this.anexoD = resultado.anexoD;
      this.ubicacionD = resultado.ubicacionD;
      this.archivoD = resultado.archivoD;
      console.log('Descripcion: '+resultado.descripcionD+' Anexo: '+resultado.anexoD+' Archivo: '+resultado.archivoD);
      if (this.archivoD!) {
        this.disabled = true;
      }
    });
  }
/*
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: yourHeadersConfig })
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
}
*/

}

@Component({
  selector:'modal-datos-almacenados.component',
  templateUrl:'./modal-datos-almacenados.component.html',
  styleUrls: ['./second-page.component.css']
})
export class ModalDatosAlmacenadosComponent{
  constructor(public dialogRef: MatDialogRef<ModalDatosAlmacenadosComponent>, @Inject(MAT_DIALOG_DATA) public data){}
}

@Component({
  selector: 'modal-subir-documento.component',
  templateUrl: './modal-subir-documento.component.html',
  styleUrls: ['./second-page.component.css']
})
export class ModalSubirDocumentoComponent {
  fileToUpload: File = null;

  constructor(public dialogRef: MatDialogRef<ModalSubirDocumentoComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalDocumentoData){}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}