import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  @Input() Confirmacion: boolean = false;
  private gestion: gestiondenuncia = {
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
    fechaRegistro:null,
    fechaModificacion:null,
    usuarioModificacion:'',
    jdc:'',
    idFirmaRepresentantecsj:0,
    idFirmaRepresentantemined:0
  };
  constructor(private api:ApiService, private routeActivate: ActivatedRoute) { }

  ngOnInit() {
    //console.log('ID:'+this.routeActivate.snapshot.paramMap.get('id'));
    this.api.getGestionByTipo("Confirmar/"+this.routeActivate.snapshot.paramMap.get('id')+"/0").subscribe((respuesta:gestiondenuncia) => { 
      this.gestion = respuesta;
      if(respuesta!=null) { this.Confirmacion = true; } else { this.Confirmacion = false; }  
    }, (err) => this.api.handleError(err), () => {
      //console.log('VERIFICACION COMPLETADO');
      //Entrara en esta sentencia solo si aun no ha sido confirmada la denuncia
      if(this.Confirmacion==true){ 
        this.gestion.estado = 1; 
        this.gestion.fechaModificacion = new Date();
        this.gestion.usuarioModificacion = 'USUARIO CONFIRMACION';
        this.api.putGestion(this.gestion).subscribe(respuesta=>{},(err)=>this.api.handleError(err),()=> {}); 
      } 
    });
  }
}
