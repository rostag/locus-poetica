import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generator'
  },
  { 
    path: 'generator',
    loadChildren: () => import('./generator/generator.module').then(m => m.GeneratorModule)
  },
  { 
    path: 'compass', 
    loadChildren: () => import('./compass/compass.module').then(m => m.CompassModule)
  },
  { 
    path: 'latynizator', 
    loadChildren: () => import('./latynizator/latynizator.module').then(m => m.LatynizatorModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
