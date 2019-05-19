import { Component, OnInit } from '@angular/core';

//Pop Up Para Añadir Campos
//Se añade la vista de donde se añaden las conecciones
import { AddConectionDjPage } from '../../components/popover/add-conection-dj/add-conection-dj.page';
import { NavController, PopoverController } from '@ionic/angular';

//Servicio para actualizar el componente de dijistra
import { DjistraComponentServiceService } from '../../services/djistra-component-service.service';

@Component({
  selector: 'app-graph-dijkstra',
  templateUrl: './graph-dijkstra.component.html',
  styleUrls: ['./graph-dijkstra.component.scss'],
})
export class GraphDijkstraComponent implements OnInit {
  
  
  constructor(private nav: NavController, private popoverController: PopoverController, public dijistraComponent : DjistraComponentServiceService) {
    dijistraComponent.startService();
  }

  ngOnInit() {}



  //addConection(from : number, to : number, value : number){
    //this.conections.push({from,to,value});
  async  popOverAddConection(opcAdd,
    ev: Event){
      const popover = await this.popoverController.create({
        component: AddConectionDjPage,
        componentProps:{
          opcAdd: opcAdd,
        }
      });
      popover.present();
  }
}
