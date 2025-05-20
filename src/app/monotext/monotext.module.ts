import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonotextComponent } from "./monotext/monotext.component";
import { MonotextRoutingModule } from "./monotext-routing.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [MonotextComponent],
  imports: [
    CommonModule,
    MonotextRoutingModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
  ],
})
export class MonotextModule {}
