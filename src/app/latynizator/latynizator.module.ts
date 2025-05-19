import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LatynizatorComponent } from "./components/latynizator/latynizator.component";
import { LatynizatorRoutingModule } from "./latynizator-routing.module";
import { LatynizatorService } from "./latynizator.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LatynizatorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [LatynizatorComponent],
  providers: [LatynizatorService],
})
export class LatynizatorModule {}
