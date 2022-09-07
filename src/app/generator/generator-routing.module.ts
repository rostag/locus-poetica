import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnagrammatorComponent } from './components/anagrammator/anagrammator.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ModelAxesComponent } from './components/model-axes/model-axes.component';

const routes: Routes = [{
  path: '',
  component: GeneratorComponent
}, {
  path: 'anagrammator',
  component: AnagrammatorComponent
}, {
  path: 'axes',
  component: ModelAxesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
