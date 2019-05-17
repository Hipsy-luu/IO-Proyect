import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
//En este modulo tengo como implementar las graficas y los metodos relacionados en cada elemento
import { ComponentsModule } from '../../components/components.component';

import { DrawGraphPage } from "../pages/draw-graph/draw-graph.page"
import { DrawGraphPageModule } from "../pages/draw-graph/draw-graph.module"

@NgModule({
    entryComponents: [
        DrawGraphPage
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: Tab2Page }]),
        DrawGraphPageModule,
        ComponentsModule,
    ],
    declarations: [Tab2Page]
})
export class Tab2PageModule { }
