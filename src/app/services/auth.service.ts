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
    public data: denuncia = null;
    constructor(private api:ApiService){
        
    }

    public AutenticacionUsuario(documento,expediente) {
        return new Promise((resolve, reject) => {
            this.api.getDenunciaExist(documento,expediente).subscribe((resp) => 
            { this.data = resp; resolve(resp);  }, (err) => reject(err), () => {});
        })
    }

    public AutenticacionEstado(): boolean {
        if(this.data!=null){ return true; }
        return false;
    }

    public InvalidarAutenticacion(){
        this.data = null;
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