import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SoundflowComponent } from "src/app/soundflow/soundflow.component";

const routes: Routes = [{ path: "", component: SoundflowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundflowRoutingModule {}
