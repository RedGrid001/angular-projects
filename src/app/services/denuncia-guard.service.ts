import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class DenunciaGuardService implements CanActivate {
    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean { 
        //route.url[1].path;
        var compromiso = sessionStorage.getItem('compromiso');
        if (compromiso!=null && compromiso=="true") {
            return true;
        } else {
            alert("Debes aceptar el compromiso para continuar");
            this._router.navigate(['/compromiso']);
            return false;
        }
        //return true;
    }
}