import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/chat/main/main.component';
import { Error404Component } from './modules/error404/error404.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: MainComponent},
  {path: '**', pathMatch: 'full', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
