// loader.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="isLoading" class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
}

