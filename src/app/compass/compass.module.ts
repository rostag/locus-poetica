import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtftModule } from 'atft';
import { CompassRoutingModule } from './compass-routing.module';
import { CompassService } from './compass.service';
import { CompassComponent } from './components/compass/compass.component';

@NgModule({
  imports: [
    CommonModule,
    AtftModule,
    ReactiveFormsModule,
    CompassRoutingModule,
  ],
  declarations: [
      CompassComponent
  ],
  providers: [
    CompassService
  ]
})
export class CompassModule {
}
