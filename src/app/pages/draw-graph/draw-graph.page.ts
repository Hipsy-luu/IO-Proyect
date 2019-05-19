import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use(edgehandles);

@Component({
  selector: 'app-draw-graph',
  templateUrl: './draw-graph.page.html',
  styleUrls: ['./draw-graph.page.scss'],
})
export class DrawGraphPage implements OnInit {

  cy;

  constructor(private modalController: ModalController, public toastController: ToastController, public popoverController: PopoverController) { }

  ngOnInit() {
  }

  //Aqui nomas mandamos a llamar los metodos de los algoritmos y ya en otro lado los definimos
    //Todo sea por un código mas L I M P I O
    optionHandler(option){
      switch(option) {
          case "RCorta": {
             //statements;
             break;
          }
          case "MSATree": {
             //statements;
             break;
          }
          case "RCritica":{
              //statements;
              break;
          }
      }
  }


}
