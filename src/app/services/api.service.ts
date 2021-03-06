import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { contacto } from '../entities/contacto';
import { Observable, throwError } from 'rxjs';
import { denuncia } from '../entities/denuncia';
import { environment } from 'src/environments/environment';
import { gestiondenuncia } from '../entities/gestiondenuncia';
import { correo } from '../entities/correo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { centrosescolares } from '../entities/centros_escolares';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'jwt-token',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  public getCentrosEscolares(): Observable<centrosescolares[]>{
    return this.http.get<centrosescolares[]>(environment.urlAPI.ce, this.httpOptions);
  }

  public getContacto(numeroDocumento: number,tipoDocumento: string,fechaNacimiento:any): Observable<contacto> {
    return this.http.get<contacto>(environment.urlAPI.contactos+"/"+numeroDocumento+"/"+tipoDocumento+"/"+fechaNacimiento, this.httpOptions);
  }

  public getDenunciaById(idDenuncia:any): Observable<denuncia>{
    return this.http.get<denuncia>(environment.urlAPI.denuncia+"/"+idDenuncia, this.httpOptions);
  }

  public getDenunciaExist(numeroDocumento: string, noExpediente: string): Observable<denuncia> {
    return this.http.get<denuncia>(environment.urlAPI.denuncia+"/"+numeroDocumento+"/"+noExpediente, this.httpOptions);
  }

  public postDenuncia(denuncia: denuncia): Observable<denuncia> {
    return this.http.post<denuncia>(environment.urlAPI.denuncia, denuncia, this.httpOptions);
  }

  public getGestionById(idDenuncia): Observable<gestiondenuncia> {
    return this.http.get<gestiondenuncia>(environment.urlAPI.gestion+"/Id/"+idDenuncia,this.httpOptions);
  }

  public getGestionByTipo(tipo:string) {
    return this.http.get(environment.urlAPI.gestion+"/"+tipo,this.httpOptions);
  }

  public putGestion(gestion: gestiondenuncia): Observable<gestiondenuncia> {
    return this.http.put<gestiondenuncia>(environment.urlAPI.gestion, gestion, this.httpOptions);
  }

  //Correos

  public postCorreo(tipo: string, correo: correo){
    return this.http.post(environment.urlAPI.correo+"/"+tipo,correo, this.httpOptions);
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