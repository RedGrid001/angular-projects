import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { MAT_DATE_LOCALE } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DenunciaComponent, DialogFuncionarioComponent, DialogConfirmacionComponent, DialogCargarDocumentoComponent } from './denuncia/denuncia.component';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { CompromisoComponent } from './compromiso/compromiso.component';
import { ResumenComponent } from './resumen/resumen.component';
import { DenunciaGuardService } from './services/denuncia-guard.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadoComponent, DialogCompromisoComponent } from './estado/estado.component';
import { UsuarioLayoutComponent } from './layouts/usuario-layout.component';
import { DenunciaLayoutComponent } from './layouts/denuncia-layout.component';
import { FaqComponent } from './faq/faq.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { from } from 'rxjs';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    DenunciaComponent,
    DialogFuncionarioComponent,
    DialogConfirmacionComponent,
    DialogCargarDocumentoComponent,
    InicioUsuarioComponent,
    PrincipalComponent,
    CompromisoComponent,
    ResumenComponent,
    UsuarioComponent,
    InicioComponent,
    PerfilComponent,
    EstadoComponent,
    DialogCompromisoComponent,
    UsuarioLayoutComponent,
    DenunciaLayoutComponent,
    FaqComponent,
    ConfirmarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    LayoutModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    TextMaskModule
  ],
  entryComponents: [
    DialogFuncionarioComponent,
    DialogCargarDocumentoComponent, 
    DialogConfirmacionComponent,
    DialogCompromisoComponent
  ],
  providers: [
    DenunciaGuardService, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
//provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }
//{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
