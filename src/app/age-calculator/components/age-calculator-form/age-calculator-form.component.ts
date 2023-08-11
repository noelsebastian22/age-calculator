import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LineButtonComponent } from 'src/app/shared/components/line-button/line-button.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';

@Component({
  selector: 'app-age-calculator-form',
  templateUrl: './age-calculator-form.component.html',
  styleUrls: ['./age-calculator-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, LineButtonComponent],
})
export class AgeCalculatorFormComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
    });
  }
}