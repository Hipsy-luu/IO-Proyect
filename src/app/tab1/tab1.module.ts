import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

//En este modulo tengo como implementar las graficas y los metodos relacionados en cada elemento
import { ComponentsModule } from '../../components/components.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    //componentes personalizados
    ComponentsModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
