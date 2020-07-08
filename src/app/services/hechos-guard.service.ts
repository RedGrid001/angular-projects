import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class HechosGuardService implements CanActivate {
    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let compromiso: string = route.url[1].path;
        if (compromiso=="true") {
            return true;
        } else {
            alert("Debes aceptar el compromiso para continuar");
            this._router.navigate(['/compromiso']);
            return false;
        }
        //return true;
    }
}