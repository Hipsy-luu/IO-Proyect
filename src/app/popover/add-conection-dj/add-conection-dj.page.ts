import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

//Servicio para actualizar el componente de dijistra
import { DjistraComponentServiceService } from '../../services/djistra-component-service.service';
//Servicio para actualizar el componente de prim
import { PrimComponentServiceService } from '../../services/prim-component-service.service';

@Component({
  selector: 'app-add-conection-dj',
  templateUrl: './add-conection-dj.page.html',
  styleUrls: ['./add-conection-dj.page.scss'],
})
export class AddConectionDjPage implements OnInit {
  from ;
  to ;
  value ;
  opcAdd ;

  constructor( 
    private navParams: NavParams , 
    private popoverController: PopoverController , 
    public dijistraComponent : DjistraComponentServiceService,
    public primComponent : PrimComponentServiceService
  ) {
    this.from = "a";
    this.to = "a";
    this.value = 0.0;
  }

  ngOnInit() {
    //Se recojen los parametros pasados al crear el popup
    this.opcAdd = this.navParams.get('opcAdd');
  }

  add(){
    /*console.log("from: "+ this.from);
    console.log("to: "+ this.to);
    console.log("value: "+ this.value);*/

    switch(this.opcAdd){
      //El caso 0 es cuando lo añadimos al servicio del djistra
      case 0:
        this.dijistraComponent.addConection(this.from, this.to , this.value);
        break;
      //El caso 1 es cuando lo añadimos al servicio del prim
      case 1:
        this.primComponent.addConection(this.from, this.to , this.value);
        break;
      default:
       break;
    }
    this.closePopover();
  }

  closePopover(){
    this.popoverController.dismiss();
  }

}
