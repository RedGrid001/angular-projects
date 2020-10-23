import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  displayedColumns: string[] = ['expediente', 'registro', 'modificacion', 'estado'];
  dataSource = new MatTableDataSource();
  estadoDenuncia: number = 0;
  correoUser: string = 'usuario@dominio.com';
  gestion_dataSource: gestiondenuncia[] = [];
  gestion: gestiondenuncia = {
    idDenuncia:0,
    noExpediente:'',
    nombreDenunciante:'',
    estado:0,
    archivado:0,
    fechaAudiencia:null,
    lugar:'',
    generalidades:'',
    resolucion:'',
    idFirmaRepresentantedocentes:0,
    portalTransparencia:'',
    fechaModificacion:null,
    fechaRegistro:null,
    usuarioModificacion:'',
    jcd:'',
    idFirmaRepresentantecsj:0,
    idFirmaRepresentantemined:0
  }

  constructor(private authUser:AuthService, private api:ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.correoUser = this.authUser.getCorreo();
    this.getGestion();
    //this.dataSource = new MatTableDataSource(this.gestion_dataSource);
  }

  public getGestion(){
    try {
      this.api.getGestionById(this.authUser.getId()).subscribe((respuesta) => {
        this.gestion = respuesta;
        this.gestion_dataSource.push(respuesta);
        console.log(respuesta);
        this.dataSource = new MatTableDataSource(this.gestion_dataSource)
        this.estadoDenuncia = respuesta.estado;
      },(err) => { this.api.handleError(err); /* this.gestion = this.authUser.data.gestionDenuncia.find(datos => datos.idDenuncia== this.authUser.data.idDenuncia); */ }, () => {});
    } catch (error) {
      this.api.handleError(error);
    }
  }

  public TextoByEstado(estado:number){
    switch (estado) {
      case 0:
        return `Debes entrar a tu correo ${this.correoUser}, para confirmar tu denuncia y pasar a la siguiente etapa.`;
      case 1:
        return `Tu denuncia fue confirmada y en los próximos días podrá entrar en la etapa de proceso.`;
      case 2:
        if(this.gestion.fechaAudiencia!=null && this.gestion.lugar!=null){ 
          let date = new Date(this.gestion.fechaAudiencia);
          //this.gestion.fechaAudiencia = date;
          return `Tienes un citatorio para la fecha ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} en ${this.gestion.lugar}, esperamos tu asistencia`;
        } else {
          return `La denuncia está en proceso, aun no se ha asignado fecha y lugar para el citatorio.`;
        }
      case 3:
        return `${this.gestion.nombreDenunciante} tu denuncia a terminado todas las etapas posibles, gracias por ser parte de este proceso.`;
      default:
        return `¡No hay información para mostrar!`;
    }
  }

  DialogCompromiso() {
    const dialogRef = this.dialog.open(DialogCompromisoComponent, {
      data: { 
        
      }
    });
  }
}

@Component({
  selector: 'dialog-compromiso.component',
  templateUrl: './dialog-compromiso.html',
  styleUrls: ['./estado.component.css']
})

export class DialogCompromisoComponent {

  nombreCompleto: string = 'Nombre y Apellido';
  numeroDocumento: string = '00000000-0';
  filepdf: File;
  doc = new jsPDF('p','mm','letter');

  constructor(public dialogRef: MatDialogRef<DialogCompromisoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nombreCompleto = sessionStorage.getItem('nombre')+" "+sessionStorage.getItem('apellido'); 
    this.numeroDocumento = sessionStorage.getItem('numerodocumento');
  }

  public DescargarPDF(){

    var element = document.getElementById('contenido');
    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL('image/jpeg',1.0);
      var imgWidth = 185.9;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      this.doc.addImage(imgData,'JPEG',15,10,imgWidth,imgHeight);
      this.doc.save("Compromiso.pdf");

    });

  }

}
