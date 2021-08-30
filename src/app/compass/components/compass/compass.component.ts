import { Component } from "@angular/core";

@Component({
    selector: 'app-compass',
    template: `<div>Compass Component</div>`
})

export class CompassComponent {

    constructor () {
        console.log('Compass:', this);
    }
}