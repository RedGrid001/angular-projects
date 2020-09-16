import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { PrincipalComponent } from './principal/principal.component';
import { InicioUsuarioComponent} from './inicio-usuario/inicio-usuario.component';
import { CompromisoComponent } from './compromiso/compromiso.component';
import { ResumenComponent } from './resumen/resumen.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DenunciaGuardService } from './services/denuncia-guard.service';
import { UsuarioLayoutComponent } from './layouts/usuario-layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadoComponent } from './estado/estado.component';
import { DenunciaLayoutComponent } from './layouts/denuncia-layout.component';
import { AuthGuard } from './services/auth.guard';
import { FaqComponent } from './faq/faq.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';


const routes: Routes = [ 
  { path: '', component: UsuarioLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'inicio', component: InicioComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'estado', component: EstadoComponent },
    { path: 'faq', component: FaqComponent }
  ]},
  { path: '', component: DenunciaLayoutComponent, children: [
    { path: 'inicio-usuario', component: InicioUsuarioComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'compromiso', component: CompromisoComponent },
    { path: 'denuncia/:compromiso', canActivate: [ DenunciaGuardService ], component: DenunciaComponent },
    { path: 'resumen', component: ResumenComponent },
    { path: 'confirmar/:id', component: ConfirmarComponent }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration:'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
