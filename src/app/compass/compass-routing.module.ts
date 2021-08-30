import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompassComponent } from './components/compass/compass.component';

const routes: Routes = [
  {
    path: '',
    component: CompassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompassRoutingModule { }
