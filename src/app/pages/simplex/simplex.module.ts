import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SimplexPage } from './simplex.page';

//En este modulo tengo como implementar las graficas y los metodos relacionados en cada elemento
import { ComponentsModule } from '../../components/components.component';
import { DrawGraphPage } from "../draw-graph/draw-graph.page";
import { DrawGraphPageModule } from "../draw-graph/draw-graph.module";

const routes: Routes = [
  {
    path: '',
    component: SimplexPage
  }
];

@NgModule({
    entryComponents: [
        DrawGraphPage
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        DrawGraphPageModule,
        ComponentsModule,
    ],
  declarations: [SimplexPage]
})
export class SimplexPageModule {}
