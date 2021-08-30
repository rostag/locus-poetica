import { Component } from "@angular/core";

@Component({
    selector: 'app-compass',
    templateUrl: './compass.component.html',
    styleUrls: ['./compass.component.css']
})

export class CompassComponent {

    constructor () {
        console.log('Compass:', this);
    }
}