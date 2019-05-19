import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SimplexPage } from './simplex.page';

//En este modulo tengo como implementar las graficas y los metodos relacionados en cada elemento
import { ComponentsModule } from '../../components/components.component';

const routes: Routes = [
  {
    path: '',
    component: SimplexPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    //Importo los componentes que hay en el modulo
    ComponentsModule
  ],
  declarations: [SimplexPage]
})
export class SimplexPageModule {}
