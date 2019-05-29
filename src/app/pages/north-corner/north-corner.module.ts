import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NorthCornerPage } from './north-corner.page';

import { ComponentsModule } from '../../components/components.component';

const routes: Routes = [
  {
    path: '',
    component: NorthCornerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [NorthCornerPage]
})
export class NorthCornerPageModule {}
