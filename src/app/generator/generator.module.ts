import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AudioComponent } from "./components/audio/audio.component";
import { CNewsComponent } from "./components/c-news/c-news.component";
import { GeneratorComponent } from "./components/generator/generator.component";
import { PoetryXComponent } from "./components/poetry-x/poetry-x.component";
import { PoetryComponent } from "./components/poetry/poetry.component";
import { PoetryService } from "./components/services/poetry.service";
import { GeneratorRoutingModule } from "./generator-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SampleComponent } from "./components/audio/sample.component";
import { AnagrammatorComponent } from "./components/anagrammator/anagrammator.component";
import { ModelAxesComponent } from "./components/model-axes/model-axes.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent,
    SampleComponent,
    CNewsComponent,
    PoetryXComponent,
    PoetryComponent,
    AnagrammatorComponent,
    ModelAxesComponent,
  ],
  providers: [PoetryService],
})
export class GeneratorModule {}
