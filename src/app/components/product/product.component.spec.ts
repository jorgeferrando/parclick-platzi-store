import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { Component, ViewChild } from '@angular/core';
import { Product } from '../../models/product.type';
import { ImageNotFoundPipe } from '../../pipes/image-not-found.pipe';

const testProduct: Product = {
  id: 4,
  title: 'Handmade Fresh Table',
  price: 687,
  description: 'Andy shoes are designed to keeping in...',
  category: {
    id: 5,
    name: 'Others',
    image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
  },
  images: [
    'https://placeimg.com/640/480/any?r=0.9178516507833767',
    'https://placeimg.com/640/480/any?r=0.9300320592588625',
    'https://placeimg.com/640/480/any?r=0.8807778235430017',
  ],
};

@Component({
  selector: 'test-component',
  template: `<app-product [product]="product">
    <img image data-testid="image" [src]="product.images[0]" />
    <div footer>footer</div>
  </app-product>`,
})
class TestComponent {
  @ViewChild(ProductComponent)
  advancedFilterComponent!: ProductComponent;
  product = testProduct;
}

describe('ProductComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent, TestComponent, ImageNotFoundPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display product title', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector(
      "[data-testid='title']"
    );
    expect(title.textContent).toBe(testProduct.title);
  });
  it('should display image slot', () => {
    const image: HTMLImageElement =
      fixture.nativeElement.querySelector('[image]');
    expect(image.src).toBe(testProduct.images[0]);
  });
  it('should display category name', () => {
    const category: HTMLElement = fixture.nativeElement.querySelector(
      "[data-testid='category']"
    );
    expect(category.textContent).toContain(testProduct.category.name);
  });
  it('should display price', () => {
    const price: HTMLElement = fixture.nativeElement.querySelector(
      "[data-testid='price']"
    );
    expect(price.textContent).toBe(`Price: ${testProduct.price} €`);
  });
  it('should display description', () => {
    const description: HTMLElement = fixture.nativeElement.querySelector(
      "[data-testid='description']"
    );
    expect(description.textContent).toBe(
      `${testProduct.description.slice(0, 100)} ... `
    );
  });
  it('should display footer slot', () => {
    const footer: HTMLElement = fixture.nativeElement.querySelector('[footer]');
    expect(footer.textContent).toBe('footer');
  });
});
