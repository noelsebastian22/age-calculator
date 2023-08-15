import { Injectable, signal } from '@angular/core';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from 'date-fns';
import { Age } from '../types/age';

@Injectable({ providedIn: 'root' })
export class AgeCalculatorService {
  ageSig = signal<Age | null>(null);

  setAge(age: Age) {
    this.ageSig.set(age);
  }

  /**
   * Calculate age from date of birth
   */
  calculateAge(dateOfBirth: Date): {
    years: number;
    months: number;
    days: number;
  } {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);

    const years = differenceInYears(currentDate, birthDate);
    const months = differenceInMonths(currentDate, birthDate) % 12;
    const days = differenceInDays(currentDate, birthDate) % 30; // Roughly assuming 30 days per month

    return {
      years: years,
      months: months,
      days: days,
    };
  }
}
