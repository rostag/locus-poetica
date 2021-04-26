import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioComponent } from './components/audio/audio.component';
import { CNewsComponent } from './components/c-news/c-news.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { PoetryXComponent } from './components/poetry-x/poetry-x.component';
import { PoetryComponent } from './components/poetry/poetry.component';
import { PoetryService } from './components/services/poetry.service';
import { GeneratorRoutingModule } from './generator-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent,
    CNewsComponent,
    PoetryXComponent,
    PoetryComponent,
  ],
  providers: [
    PoetryService
  ]
})
export class GeneratorModule {
}
