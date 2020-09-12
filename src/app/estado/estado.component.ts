import { Component, OnInit } from '@angular/core';

/* export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
} */

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  colorRegistrada: string = '#DF3D3D';
  colorProceso: string = '#DF3D3D';
  colorFinalizada: string = '#DF3D3D';
  /* tiles: Tile[] = [
    { text: 'DENUNCIA REGISTRADA', cols: 1, rows: 1, color: '#DF3D3D' },
    { text: 'DENUNCIA EN PROCESO', cols: 1, rows: 1, color: '#DF3D3D' },
    { text: 'DENUNCIA FINALIZADA', cols: 1, rows: 1, color: '#DF3D3D' }
  ]; */
  constructor() { }

  ngOnInit() {
    this.CambiarColor(0);
  }

  private CambiarColor(estado:number){
    switch (estado) {
      case 1:
        this.colorRegistrada = '#78D167';
        break;
      case 2:
        this.colorRegistrada = '#78D167';
        this.colorProceso = '#78D167';
        break;
      case 3:
        this.colorRegistrada = '#78D167';
        this.colorProceso = '#78D167';
        this.colorFinalizada = '#78D167';
      default:
        break;
    }
  }

}
