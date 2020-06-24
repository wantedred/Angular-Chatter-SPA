import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbaordComponent } from './modules/dashbaord/dashbaord.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: DashbaordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
