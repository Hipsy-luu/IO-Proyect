import { Component, OnInit } from '@angular/core';
//Servicio que nos ayuda con las variables para llenar el metodo simplex
//Y construirlo
import { SimplexTabService } from '../../app/services/simplex-tab.service';

@Component({
  selector: 'app-calc-symplex',
  templateUrl: './calc-symplex.component.html',
  styleUrls: ['./calc-symplex.component.scss'],
})
export class CalcSymplexComponent implements OnInit {

  constructor(public simplexTabService : SimplexTabService) { }

  ngOnInit() {}

  decrementNumofVar(){
    if(this.simplexTabService.numVar>2){
      this.simplexTabService.numVar--;
      this.simplexTabService.refreshVariables();
    }
  }
  incrementNumofVar(){
    this.simplexTabService.numVar++;
    this.simplexTabService.refreshVariables();
  }
  decrementNumofRest(){
    if(this.simplexTabService.numRest>2){
      this.simplexTabService.numRest--;
      this.simplexTabService.refreshConstraints();
    }
  }
  incrementNumofRest(){
    this.simplexTabService.numRest++;
    this.simplexTabService.refreshConstraints();
  }
}
