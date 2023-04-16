import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../repositories/product/product.service";
import {AppState} from "../../models/app-state.type";

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomePageComponent {
  searchForm = new FormGroup({
    title: new FormControl('')
  })
  appState$: Observable<AppState> = this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((form: any) => {
      return this.productService.search(form).pipe(
        map((value) => ({loading: false, data: value, error: null})),
        catchError((error) => of({loading: false, error: error.message, data: []})),
        startWith({loading: true, error: null, data: []})
      );
    }),
    startWith({loading: false})
  );
  constructor(private productService: ProductService, private router: Router) {}

  goToAdvancedSearch() {
    this.router.navigate([`advanced-search`], {
      queryParams: {
        title: this.searchForm.value.title
      }
    });
  }
}
