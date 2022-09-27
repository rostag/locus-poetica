import { Component, ElementRef, ViewChild } from "@angular/core";
import * as THREE from "three";
import { PerspectiveCamera, Renderer, Scene } from "three";

@Component({
    selector: 'app-compass-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {

    @ViewChild('webgloutput') webgloutput: ElementRef;

    scene: Scene;
    camera: PerspectiveCamera;
    renderer: Renderer;

    constructor() { }

    // ngOnInit() {
    //     this.initThree();
    // }

    ngAfterViewInit() {
        this.initThree();
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.webgloutput.nativeElement.appendChild(this.renderer.domElement);

        console.log('Init nav:', this, window.innerWidth, window.innerHeight);

        this.addGeometry();
        this.animate();
    }

    addGeometry() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera.position.z = 10;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.camera.position.x += 0.001;
        this.camera.position.z -= 0.21;

        if (this.camera.position.z < 0.2) {
            this.camera.position.z = 10;
        }

        this.renderer.render(this.scene, this.camera);
    }
}
