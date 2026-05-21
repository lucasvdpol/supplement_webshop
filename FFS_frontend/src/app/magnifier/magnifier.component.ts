import { Component } from '@angular/core';

@Component({
  selector: 'app-magnifier',
  imports: [],
  templateUrl: './magnifier.component.html',
  styleUrl: './magnifier.component.scss'
})
export class MagnifierComponent {
  zoomed: boolean = false;

  toggleZoom() {
    this.zoomed = !this.zoomed;
    document.body.style.zoom = this.zoomed ? "1.5" : "1";
  }
}
