import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCnXaA5hNtHLehUNWMEuWxh4wqBOY5oXPY",
    authDomain: "sigd-be78b.firebaseapp.com",
    databaseURL: "https://sigd-be78b.firebaseio.com",
    projectId: "sigd-be78b",
    storageBucket: "sigd-be78b.appspot.com",
    messagingSenderId: "607231031314",
    appId: "1:607231031314:web:725ffb32a4538c9d8300cb",
    measurementId: "G-1SDLC1JD18"
  },
  urlAPI: {
    gestion: '/api/Gestiondenuncia',
    denuncia: '/api/Denuncia',
    contactos: '/api/Contactos',
    correo: '/api/Email',
    ce: '/api/CE'
  },
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'jwt-token'
    })
  }
};


