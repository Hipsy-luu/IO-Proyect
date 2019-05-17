import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrawGraphPage } from './draw-graph.page';

import { AddNodePage } from '../add-node/add-node.page';
import { AddNodePageModule } from '../add-node/add-node.module';

import { EdgeWeightComponent } from '../../../components/edge-weight/edge-weight.component';

@NgModule({
    entryComponents: [
        AddNodePage,
        EdgeWeightComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddNodePageModule
    ],
    declarations: [DrawGraphPage, EdgeWeightComponent]
})
export class DrawGraphPageModule { }
