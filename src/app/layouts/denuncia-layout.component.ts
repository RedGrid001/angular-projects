import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncia-layout',
  template: `<mat-toolbar class="text-white bg-dark">
            <button mat-icon-button [routerLink]="['/inicio-usuario']" class="example-icon" aria-label="Example icon-button with menu icon">
              <mat-icon>menu</mat-icon>
            </button>
            <span>SADEMINED</span>
            </mat-toolbar>
          <router-outlet></router-outlet>`,
  styles: []
})
export class DenunciaLayoutComponent {}