import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(x => x.HomePageModule),
  },
  {
    path: 'advanced-search',
    loadChildren: () =>
      import('./pages/advanced-search-page/advanced-search-page.module').then(
        x => x.AdvancedSearchPageModule
      ),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./pages/product-page/product-page.module').then(
        x => x.ProductPageModule
      ),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
