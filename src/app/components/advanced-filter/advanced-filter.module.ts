import { NgModule } from '@angular/core';
import { AdvancedFilterComponent } from './advanced-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [AdvancedFilterComponent],
  exports: [AdvancedFilterComponent],
})
export class AdvancedFilterModule {}
