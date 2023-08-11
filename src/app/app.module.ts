import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AgeCalculatorComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
