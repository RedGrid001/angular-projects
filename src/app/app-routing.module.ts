import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { PrincipalComponent } from './principal/principal.component';
import { InicioUsuarioComponent} from './inicio-usuario/inicio-usuario.component';
import { CompromisoComponent } from './compromiso/compromiso.component';
import { ResumenComponent } from './resumen/resumen.component';
import { DenunciaGuardService } from './services/denuncia-guard.service';


const routes: Routes = [ 
  {path:'denuncia/:compromiso', canActivate:[ DenunciaGuardService ] , component:DenunciaComponent}, 
  {path:'principal', component: PrincipalComponent},
  {path:'inicio-usuario', component:InicioUsuarioComponent},
  {path:'compromiso', component:CompromisoComponent},
  {path:'resumen', component:ResumenComponent},
  {path:'**', pathMatch:'full', redirectTo: 'inicio-usuario'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration:'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
