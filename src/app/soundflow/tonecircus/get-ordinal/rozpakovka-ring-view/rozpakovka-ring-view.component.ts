import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdnRozpakovkaRingIn } from "src/app/soundflow/tonecircus/models/abetka.models";

@Component({
  selector: "app-rozpakovka-ring-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./rozpakovka-ring-view.component.html",
  styleUrl: "./rozpakovka-ring-view.component.css",
})
export class RozpakovkaRingViewComponent {
  @Input() data: IdnRozpakovkaRingIn | null = null;
}
