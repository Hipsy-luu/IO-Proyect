import { Component, OnInit } from '@angular/core';

//Pop Up Para Añadir Campos
//Se añade la vista de donde se añaden las conecciones
import { AddConectionDjPage } from '../../components/popover/add-conection-dj/add-conection-dj.page';
import { NavController, PopoverController } from '@ionic/angular';

//Servicio que nos ayuda alimentar la interfaz y ademas contiene los metodos para resolver
//El grafo por el metodo de prim
import { PrimComponentServiceService } from '../../services/prim-component-service.service';

@Component({
  selector: 'app-graph-prim',
  templateUrl: './graph-prim.component.html',
  styleUrls: ['./graph-prim.component.scss'],
})
export class GraphPrimComponent implements OnInit {

  constructor(private nav: NavController, private popoverController: PopoverController,public primComponent : PrimComponentServiceService) {
    primComponent.startService();
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
