import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TonematrixComponent } from './tonematrix.component';

const routes: Routes = [{ path: '', component: TonematrixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TonematrixRoutingModule { }
