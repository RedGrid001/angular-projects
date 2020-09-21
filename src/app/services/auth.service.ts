import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { denuncia } from '../entities/denuncia';
import { Observable } from 'rxjs';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    //public authState: boolean = false;
    //public session = sessionStorage.setItem('id','0');
    public data: denuncia = {
        idDenuncia:0,
        nombreCiudadano:'',
        apellidoCiudadano:'',
        tipoDocumento:'',
        numeroDocumento:0,
        fechaNacimiento:null,
        departamentoCiudadano:'',
        direccionCiudadano:'',
        telefonoMovil:0,
        telefonoCasa:0,
        emailDenunciante:'',
        noExpediente:'',
        compromiso:[],
        hechos:[],
        funcionario:[],
        prueba:[],
        gestionDenuncia:[]
    };

    constructor(private api:ApiService){}

    public AutenticacionUsuario(documento,expediente) {
        return new Promise((resolve, reject) => {
            this.api.getDenunciaExist(documento,expediente).subscribe((respuesta) => {
                if(respuesta!=null){
                    sessionStorage.setItem('id',respuesta.idDenuncia.toLocaleString());
                    sessionStorage.setItem('nombre',respuesta.nombreCiudadano);
                    sessionStorage.setItem('correo',respuesta.emailDenunciante); 
                }
                resolve(respuesta);  
            }, (err) => reject(err), () => {});
        })
    }

    public getAutenticacionEstado(): boolean {
        if(sessionStorage.getItem('id')!=null){ return true; }
        return false;
    }

    public InvalidarAutenticacion(){
        sessionStorage.clear();
    }

    public getNombre(): string {
        return sessionStorage.getItem('nombre');
    }

    public getId(): string {
        return sessionStorage.getItem('id');
    }

    public getCorreo(): string {
        return sessionStorage.getItem('correo');
    }

    /*
    private _auth:AngularFireAuth
    _auth.authState.subscribe((auth) => {
        this.authState = auth;
    });
    public LoginUsuarioRegistrado(email: string, password: string) {
        return new Promise((resolve, reject) => {
        this._auth.signInWithEmailAndPassword(email,password).then(userData => resolve(userData), err => reject(err));
        });
    }

    public LoginUsuarioGoogle(){
        return this._auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    public LoginMicrosoft(){
        return this._auth.signInWithRedirect(new auth.OAuthProvider('microsoft.com'));
    }

    public LoginState(): boolean{
        return this._auth.authState!==null;
    }

    public Logout(){
        return this._auth.signOut();
    }
    */
}