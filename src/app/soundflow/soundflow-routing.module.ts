import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SoundflowComponent } from "src/app/soundflow/soundflow.component";
import { DzvinComponent } from "src/app/soundflow/tonecircus/components/dzvin.component";
import { ToneFlowerComponent } from "src/app/soundflow/tonecircus/toneflower.component";
import { TonetestComponent } from "src/app/soundflow/tonetest/tonetest.component";

const routes: Routes = [
  { path: "", component: SoundflowComponent },
  { path: "tonetest", component: TonetestComponent },
  { path: "tonecircus", component: ToneFlowerComponent },
  { path: "tonecircus/dzvin", component: DzvinComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundflowRoutingModule {}
