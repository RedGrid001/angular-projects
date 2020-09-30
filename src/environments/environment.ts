// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    gestion: '/apirest/Gestiondenuncia',
    denuncia: '/apirest/Denuncia',
    contactos: '/apirest/Contactos',
    correo: '/apirest/Email',
    ce: '/apirest/CE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
