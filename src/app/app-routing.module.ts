import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondPageComponent } from './second-page/second-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { PrincipalComponent } from './principal/principal.component';
import { InicioUsuarioComponent} from './inicio-usuario/inicio-usuario.component';
import { CompromisoComponent } from './compromiso/compromiso.component';
import { ResumenComponent } from './resumen/resumen.component';
import { DenunciaGuardService } from './services/denuncia-guard.service';


const routes: Routes = [ 
  {path:'first-page/:compromiso', canActivate:[ DenunciaGuardService ] , component:FirstPageComponent}, 
  {path:'second-page', component:SecondPageComponent},
  {path:'third-page', component:ThirdPageComponent},
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
