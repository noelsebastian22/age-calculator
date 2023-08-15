import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './line-button.component.html',
  styleUrls: ['./line-button.component.scss'],
  imports: [NgIf],
  standalone: true,
})
export class LineButtonComponent {
  @Input() disabled: boolean = false;
  @Input() icon: string = './src/assets/svg/icon-arrow.svg'; // Path to the SVG file
  @Input() type: 'button' | 'submit' = 'button';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
