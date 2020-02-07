import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { ModelFuncionarioComponent } from './model-funcionario/model-funcionario.component';


const routes: Routes = [ 
  {path:'first-page', component:FirstPageComponent}, 
  {path:'second-page', component:SecondPageComponent},
  {path:'third-page', component:ThirdPageComponent},
  {path:'model-funcionario', component:ModelFuncionarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
