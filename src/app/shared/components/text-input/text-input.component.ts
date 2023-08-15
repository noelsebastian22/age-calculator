import { NgClass, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';

interface stateDictionary {
  [key: string]: boolean;
}

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: true,
  imports: [NgIf, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  /**
   * The control's valid state
   */
  public valid: boolean = true;

  /**
   * The control's invalid state
   */
  public invalid: boolean = false;

  /**
   * Gets the control's pending state
   */
  public pending: boolean = false;

  /**
   * Gets the control's pristine state
   */
  public pristine: boolean = true;

  /**
   * Gets the control's untouched state
   */
  public untouched: boolean = true;

  /**
   * Gets the control's touched state
   */
  public touched: boolean = false;

  /**
   * Gets the control's dirty state
   */
  public dirty: boolean = false;

  /**
   * Validation errors for this control
   */
  public errors: ValidationErrors = {};

  /**
   * Whether the control currently has focus
   */
  public focused: boolean = false;

  /**
   * The form control for this custom input
   */
  public control: NgControl | null = null;

  /**
   *  The controls input classes
   */
  // public inputClasses: stateDictionary = this.getInputClasses();

  @Input() label: string;
  @Input() placeholder: string;
  private subscriptions: Subscription[] = [];

  value: string = '';
  isFocused: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector) {}

  ngAfterViewInit(): void {
    this.control = this.injector.get(NgControl);
    if (this.control && this.control.valueChanges) {
      this.subscriptions.push(
        this.control.valueChanges.subscribe(() => {
          this.setState();
        })
      );
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(this.value);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    // You can implement this if you need to disable the input based on form control state
  }

  public setState(): void {
    if (this.control) {
      this.valid = !!this.control.valid;
      this.invalid = !!this.control.invalid;
      this.pending = !!this.control.pending;
      this.pristine = !!this.control.pristine;
      this.untouched = !!this.control.untouched;
      this.touched = !!this.control.touched;
      this.dirty = !!this.control.dirty;
      this.errors = this.control.errors || {};
    }

    // this.showValidationErrors = this.getShowValidationErrors();
    // this.inputClasses = this.getInputClasses();
    // this.hostClass = this.getHostClass();
  }

  // protected getInputClasses(): stateDictionary {
  //   const classes: stateDictionary = {
  //     'ng-invalid': this.invalid,
  //     'ng-valid': this.valid,
  //     'ng-pending': this.pending,
  //     'ng-pristine': this.pristine,
  //     'ng-dirty': this.dirty,
  //     'ng-untouched': this.untouched,
  //     'ng-touched': this.touched,
  //     'Input--focused': this.focused,
  //   };

  //   // if (!isNullOrUndefined(this.width)) {
  //   //   classes[`Input--width-${this.width}`] = true;
  //   // }

  //   // if (this.inputClass) {
  //   //   classes[this.inputClass] = true;
  //   // }

  //   return classes;
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
