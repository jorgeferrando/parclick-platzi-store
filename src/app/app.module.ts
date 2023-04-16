import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {SearchService} from "./services/search.service";
import {RestSearchService} from "./repositories/rest-search.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AdvancedSearchPageComponent } from './pages/advanced-search-page/advanced-search-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {CategoryService} from "./services/category.service";
import {RestCategoryService} from "./repositories/rest-category.service";
import { ImageNotFoundPipe } from './pipes/image-not-found.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdvancedSearchPageComponent,
    ProductPageComponent,
    ImageNotFoundPipe
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: SearchService, useClass: RestSearchService },
    { provide: CategoryService, useClass: RestCategoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
