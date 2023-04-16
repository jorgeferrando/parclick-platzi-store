import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AdvancedSearchPageComponent} from "./pages/advanced-search-page/advanced-search-page.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";

const routes: Routes = [
  {
    path: "", pathMatch: "full", component: HomePageComponent
  },
  {
    path: "advanced-search", component: AdvancedSearchPageComponent
  },
  {
    path: "product/:id", component: ProductPageComponent
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
