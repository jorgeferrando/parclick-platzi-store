import {NgModule} from "@angular/core";
import {CategoryService} from "./category.service";
import {RestCategoryService} from "./rest-category.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: CategoryService, useClass: RestCategoryService }
  ]
})
export class CategoryRepositoryModule {}
