import { Component, computed, inject } from '@angular/core';
import { AgeCalculatorService } from '../../services/age-calculator.service';

@Component({
  selector: 'app-age-calculator-main',
  templateUrl: './age-calculator-main.component.html',
  styleUrls: ['./age-calculator-main.component.scss'],
  standalone: true,
})
export class AgeCalculatorMainComponent {
  ageService = inject(AgeCalculatorService);

  age = computed(() => this.ageService.ageSig());
}
