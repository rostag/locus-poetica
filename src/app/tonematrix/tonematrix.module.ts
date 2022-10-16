import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TonematrixRoutingModule } from './tonematrix-routing.module';
import { TonematrixComponent } from './tonematrix.component';


@NgModule({
  declarations: [
    TonematrixComponent
  ],
  imports: [
    CommonModule,
    TonematrixRoutingModule
  ]
})
export class TonematrixModule { }
