import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//Componentes personalizados para usar en la app
import { GraphDijkstraComponent } from './graph-dijkstra/graph-dijkstra.component';
import { GraphPrimComponent } from './graph-prim/graph-prim.component';
import { CalcSymplexComponent } from './calc-symplex/calc-symplex.component';
import { CalcHungaroComponent } from './calc-hungaro/calc-hungaro.component';
import { CalcNortcornerComponent } from './calc-nortcorner/calc-nortcorner.component';

@NgModule({
    declarations : [GraphDijkstraComponent,GraphPrimComponent,CalcSymplexComponent,CalcHungaroComponent,CalcNortcornerComponent],
    exports: [GraphDijkstraComponent,GraphPrimComponent,CalcSymplexComponent,CalcHungaroComponent,CalcNortcornerComponent],
    //Importamos el modulo te Ionic para tener sus componentes disponibles
    // dentro de los componentes personalizados 
    imports : [
        IonicModule,
        CommonModule,
        FormsModule
    ]
})
export class ComponentsModule {}
