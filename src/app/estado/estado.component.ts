import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  displayedColumns: string[] = ['expediente', 'nombre', 'registro', 'modificacion', 'estado'];
  dataSource = new MatTableDataSource<gestiondenuncia>();

 /*  colorRegistrada: string = '#DF3D3D';
  colorConfirmada: string = '#DF3D3D';
  colorProceso: string = '#DF3D3D';
  colorFinalizada: string = '#DF3D3D';
  correoUser: string = 'usuario@dominio.com'; */
  gestion_dataSource: gestiondenuncia [] = [];
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
    idFirmaPresidentejcd:0,
    portalTransparencia:'',
    fechaModificacion:null,
    fechaRegistro:null,
    usuarioModificacion:'',
    jdc:'',
    idFirmaRepresentantecsjjcd:0,
    idFirmaRepresentanteminedjcd:0
  }

  constructor(private authUser:AuthService, private api:ApiService) { }

  ngOnInit() {
    this.getGestion();
  }

  public getGestion(){
    try {
      this.api.getGestionById(this.authUser.data.idDenuncia).subscribe((respuesta) => {
        this.gestion_dataSource = respuesta;
        console.log(respuesta);
        this.dataSource = new MatTableDataSource(this.gestion_dataSource)
      },(err) => { this.api.handleError(err); /* this.gestion = this.authUser.data.gestionDenuncia.find(datos => datos.idDenuncia== this.authUser.data.idDenuncia); */ }, () => {});
    } catch (error) {
      this.api.handleError(error);
    }

  }

  /* private CambiarColor(estado:number){
    switch (estado) {
      case 0:
        this.colorRegistrada = '#78D167';
        break;
      case 1:
        this.colorRegistrada = '#78D167';
        this.colorConfirmada = '#78D167';
        break;
      case 2:
        this.colorRegistrada = '#78D167';
        this.colorConfirmada = '#78D167';
        this.colorProceso = '#78D167';
        break;
      case 3:
        this.colorRegistrada = '#78D167';
        this.colorConfirmada = '#78D167';
        this.colorProceso = '#78D167';
        this.colorFinalizada = '#78D167';
        break;
      default:
        break;
    }
  } */

}
