import { Component } from '@angular/core';
import { AgeCalculatorFormComponent } from './components/age-calculator-form/age-calculator-form.component';
import { AgeCalculatorMainComponent } from './components/age-calculator-main/age-calculator-main.component';

@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss'],
  standalone: true,
  imports: [AgeCalculatorFormComponent, AgeCalculatorMainComponent],
})
export class AgeCalculatorComponent {
  title = 'Age Calculator';
  birthDate: Date;
  age: number;
  today: Date;

  constructor() {
    this.birthDate = new Date();
    this.age = 0;
    this.today = new Date();
  }

  calculateAge(): void {
    this.age = this.today.getFullYear() - this.birthDate.getFullYear();
  }
}
