import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tripsearch',
    pathMatch: 'full'
  },
  {
    path: 'tripsearch',
    loadChildren: () => import('./tripsearch/tripsearch.module').then( m => m.TripsearchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
