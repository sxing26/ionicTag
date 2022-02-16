import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page-carte2',
    pathMatch: 'full'
  },
  {
    path: 'tripsearch',
    loadChildren: () => import('./tripsearch/tripsearch.module').then( m => m.TripsearchPageModule)
  },
  {
    path: 'page-test',
    loadChildren: () => import('./page-test/page-test.module').then( m => m.PageTestPageModule)
  },
  {
    path: 'page-carte2',
    loadChildren: () => import('./page-carte2/page-carte2.module').then( m => m.PageCarte2PageModule)
  },
  {
    path: 'page-carte3',
    loadChildren: () => import('./page-carte3/page-carte3.module').then( m => m.PageCarte3PageModule)
  },
  {
    path: 'page-liste-lignes',
    loadChildren: () => import('./page-liste-lignes/page-liste-lignes.module').then( m => m.PageListeLignesPageModule)
  },  {
    path: 'page-liste-stations',
    loadChildren: () => import('./page-liste-stations/page-liste-stations.module').then( m => m.PageListeStationsPageModule)
  },
  {
    path: 'page-trajet',
    loadChildren: () => import('./page-trajet/page-trajet.module').then( m => m.PageTrajetPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
