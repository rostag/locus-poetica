import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { LatynizatorComponent } from './components/latynizator/latynizator.component';
import { LatynizatorRoutingModule } from './latynizator-routing.module';
import { LatynizatorService } from './latynizator.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LatynizatorRoutingModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [
        LatynizatorComponent
    ],
    providers: [
        LatynizatorService
    ]
})
export class LatynizatorModule {
}
