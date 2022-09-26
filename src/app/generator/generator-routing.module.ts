import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnagrammatorComponent } from './components/anagrammator/anagrammator.component';
import { CNewsComponent } from './components/c-news/c-news.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ModelAxesComponent } from './components/model-axes/model-axes.component';
import { PoetryXComponent } from './components/poetry-x/poetry-x.component';
import { PoetryComponent } from './components/poetry/poetry.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'axes',
}, {
  path: 'multi',
  pathMatch: 'full',
  component: GeneratorComponent
}, {
  path: 'poet-helper',
  pathMatch: 'full',
  component: PoetryComponent,
}, {
  path: 'anagrammator',
  pathMatch: 'full',
  component: AnagrammatorComponent
}, {
  path: 'axes',
  pathMatch: 'full',
  component: ModelAxesComponent
}, {
  path: 'c-news',
  pathMatch: 'full',
  component: CNewsComponent
}, {
  path: 'poetry-x',
  pathMatch: 'full',
  component: PoetryXComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
