import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SoundflowComponent } from "src/app/soundflow/soundflow.component";
import { TonetestComponent } from "src/app/soundflow/tonetest/tonetest.component";

const routes: Routes = [
  { path: "", component: SoundflowComponent },
  { path: "tonetest", component: TonetestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundflowRoutingModule {}
