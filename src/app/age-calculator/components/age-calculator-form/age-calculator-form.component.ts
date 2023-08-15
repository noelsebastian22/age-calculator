import { Component, Inject, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LineButtonComponent } from 'src/app/shared/components/line-button/line-button.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { AgeCalculatorService } from '../../services/age-calculator.service';

@Component({
  selector: 'app-age-calculator-form',
  templateUrl: './age-calculator-form.component.html',
  styleUrls: ['./age-calculator-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, LineButtonComponent],
})
export class AgeCalculatorFormComponent {
  form!: FormGroup;

  ageCalculatorService = inject(AgeCalculatorService);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      day: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
    });
  }

  calculateAge(): void {
    if (this.form.valid) {
      const birthDate = new Date(
        this.form.value.year,
        this.form.value.month,
        this.form.value.day
      );
      const age = this.ageCalculatorService.calculateAge(birthDate);
      this.ageCalculatorService.setAge(age);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
