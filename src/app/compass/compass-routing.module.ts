import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompassComponent } from './components/compass/compass.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: CompassComponent
  },
  {
    path: 'nav',
    component: NavComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompassRoutingModule { }
