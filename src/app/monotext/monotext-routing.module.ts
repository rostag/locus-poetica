import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonotextComponent } from './monotext/monotext.component';

const routes: Routes = [
  {
    path: '',
    component: MonotextComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonotextRoutingModule { }
