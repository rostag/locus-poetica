import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatynizatorComponent } from './components/latynizator/latynizator.component';

const routes: Routes = [
  {
    path: '',
    component: LatynizatorComponent
  },
  {
    path: '/',
    component: LatynizatorComponent
  },
  {
    path: 'lat',
    component: LatynizatorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatynizatorRoutingModule { }
