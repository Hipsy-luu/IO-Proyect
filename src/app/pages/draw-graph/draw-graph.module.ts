import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrawGraphPage } from './draw-graph.page';

const routes: Routes = [
  {
    path: '',
    component: DrawGraphPage
  }
];

@NgModule({
  entryComponents: [
    
],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DrawGraphPage]
})
export class DrawGraphPageModule {}
