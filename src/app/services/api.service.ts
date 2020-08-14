import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { contacto } from '../entities/contacto';
import { Observable, throwError } from 'rxjs';
import { denuncia } from '../entities/denuncia';

//const localUrl = 'http://localhost:8080/Contactos';
const urlcontactos = '/api/Contactos';
const urldenuncia = '/api/Denuncia';
const ulrce = '/api/CE';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getCentrosEscolares(){
    return this.http.get(ulrce, httpOptions);
  }

  public getContacto(id: any): Observable<contacto> {
    return this.http.get<contacto>(urlcontactos+"/"+id, httpOptions);
  }

  public postDenuncia(denuncia: denuncia): Observable<denuncia> {
    return this.http.post<denuncia>(urldenuncia, denuncia, httpOptions);
  }

  public putDenuncia(denuncia: denuncia, id: any): Observable<denuncia> {
    return this.http.put<denuncia>(urlcontactos+"/"+id, denuncia, httpOptions);
  }

  public deleteDenuncia(id: any): Observable<denuncia> {
    return this.http.delete<denuncia>(urlcontactos+"/"+id,httpOptions);
  }

 // Error handling .pipe(retry(1), catchError(this.handleError))
  handleError(error) {
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