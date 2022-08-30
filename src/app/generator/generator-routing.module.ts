import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnagrammatorComponent } from './components/anagrammator/anagrammator.component';
import { GeneratorComponent } from './components/generator/generator.component';

const routes: Routes = [{
  path: '',
  component: GeneratorComponent
}, {
  path: 'anagrammator',
  component: AnagrammatorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
