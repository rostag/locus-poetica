import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

import { RouterModule } from "@angular/router";

@Component({
  selector: "app-abetka",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: "./abetka.component.html",
  styleUrl: "./abetka.component.css",
  standalone: true,
})
export class AbetkaComponent implements OnInit {
  ngOnInit(): void {}
}
