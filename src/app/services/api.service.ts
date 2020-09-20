import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { contacto } from '../entities/contacto';
import { Observable, throwError } from 'rxjs';
import { denuncia } from '../entities/denuncia';
import { environment } from 'src/environments/environment';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { correo } from '../entities/correo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data: denuncia = null;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  public getCentrosEscolares(){
    return this.http.get(environment.urlAPI.ce, environment.httpOptions);
  }

  public getContacto(numeroDocumento: number,tipoDocumento: string): Observable<contacto> {
    return this.http.get<contacto>(environment.urlAPI.contactos+"/"+numeroDocumento+"/"+tipoDocumento, environment.httpOptions);
  }

  public getDenunciaExist(numeroDocumento: string, noExpediente: string): Observable<denuncia> {
    return this.http.get<denuncia>(environment.urlAPI.denuncia+"/"+numeroDocumento+"/"+noExpediente, environment.httpOptions);
  }

  public postDenuncia(denuncia: denuncia): Observable<denuncia> {
    return this.http.post<denuncia>(environment.urlAPI.denuncia, denuncia, environment.httpOptions);
  }

  public getGestionById(id_denuncia:number): Observable<gestiondenuncia[]> {
    return this.http.get<gestiondenuncia[]>(environment.urlAPI.gestion+"/Id/"+id_denuncia,environment.httpOptions);
  }

  public getGestionByTipo(tipo:string) {
    return this.http.get(environment.urlAPI.gestion+"/"+tipo,environment.httpOptions);
  }

  public putGestion(gestion: gestiondenuncia): Observable<gestiondenuncia> {
    return this.http.put<gestiondenuncia>(environment.urlAPI.gestion, gestion, environment.httpOptions);
  }

  //Correos

  public postCorreo(tipo: string, correo: correo){
    return this.http.post(environment.urlAPI.correo+"/"+tipo,correo, environment.httpOptions);
  }

 // Error handling .pipe(retry(1), catchError(this.handleError))
  handleError(error) {
    let errorMessage = '';
    if(error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.AbrirSnackBar(errorMessage,'');
    return throwError(errorMessage);
  }

  public AbrirSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
}