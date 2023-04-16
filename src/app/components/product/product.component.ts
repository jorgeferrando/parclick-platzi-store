import {Component, Input} from '@angular/core';
import {Product} from "../../models/product.type";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
  @Input() product: Product | null = null;
}
