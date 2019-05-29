import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Si se descomenta esta variable la app lucira como antes estaba con la navegacion por tabs
/*const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'add-conection-dj', loadChildren: './popover/add-conection-dj/add-conection-dj.module#AddConectionDjPageModule' },
];*/

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'simplex', loadChildren: './pages/simplex/simplex.module#SimplexPageModule' },
  { path: 'draw-graph', loadChildren: './pages/draw-graph/draw-graph.module#DrawGraphPageModule' },
  { path: 'hungaro', loadChildren: './pages/hungaro/hungaro.module#HungaroPageModule' },
  { path: 'north-corner', loadChildren: './pages/north-corner/north-corner.module#NorthCornerPageModule' },
  { path: 'add-conection-dj', loadChildren: './popover/add-conection-dj/add-conection-dj.module#AddConectionDjPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
