import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnagrammatorComponent } from './components/anagrammator/anagrammator.component';
import { CNewsComponent } from './components/c-news/c-news.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ModelAxesComponent } from './components/model-axes/model-axes.component';
import { PoetryXComponent } from './components/poetry-x/poetry-x.component';

const routes: Routes = [{
  path: '',
  component: GeneratorComponent
}, {
  path: 'anagrammator',
  component: AnagrammatorComponent
}, {
  path: 'axes',
  component: ModelAxesComponent
}, {
  path: 'c-news',
  component: CNewsComponent
}, {
  path: 'poetry-x',
  component: PoetryXComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
