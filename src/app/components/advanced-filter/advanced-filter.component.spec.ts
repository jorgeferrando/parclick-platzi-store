import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvancedFilterComponent } from './advanced-filter.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'test-component',
  template: `<app-advanced-filter
    [categories]="categories"
    (queryParams)="onQueryParams($event)"></app-advanced-filter>`,
})
class TestComponent {
  @ViewChild(AdvancedFilterComponent)
  advancedFilterComponent!: AdvancedFilterComponent;
  categories = [
    { id: 1, name: 'category 1' },
    { id: 2, name: 'category 2' },
  ];
  data: any;
  onQueryParams(data: any) {
    this.data = data;
  }
}

describe('AdvancedFilterComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
      declarations: [TestComponent, AdvancedFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit values for all inputs', done => {
    const search = fixture.nativeElement.querySelector('#search');
    const minPrice = fixture.nativeElement.querySelector('#min-price');
    const maxPrice = fixture.nativeElement.querySelector('#max-price');
    const category = fixture.nativeElement.querySelector('#category');

    category.value = 1;
    category.dispatchEvent(new Event('select'));
    search.value = 'something';
    search.dispatchEvent(new Event('input'));
    minPrice.value = 10;
    minPrice.dispatchEvent(new Event('input'));
    maxPrice.value = 50;
    maxPrice.dispatchEvent(new Event('input'));
    category.value = 1;
    category.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.data).toEqual({
        title: 'something',
        price_min: 10,
        price_max: 50,
        categoryId: 1,
      });
      done();
    });
  });
});
