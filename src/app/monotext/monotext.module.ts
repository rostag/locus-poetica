import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MonotextComponent } from "./monotext/monotext.component";
import { MonotextRoutingModule } from "./monotext-routing.module";
// import { MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { FormsModule } from "@angular/forms";
// import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [MonotextComponent],
  imports: [
    CommonModule,
    MonotextRoutingModule,
    FormsModule,
    // MatCheckboxModule,
    // MatInputModule
  ],
})
export class MonotextModule {}
