import { Component, OnInit } from '@angular/core';
import { HungaroComponentServiceService } from '../../app/services/hungaro-component-service.service';

@Component({
  selector: 'app-calc-hungaro',
  templateUrl: './calc-hungaro.component.html',
  styleUrls: ['./calc-hungaro.component.scss'],
})
export class CalcHungaroComponent implements OnInit {

  constructor(public hungaroService : HungaroComponentServiceService) { }
  data: any;
  ngOnInit() {
    this.data = this.hungaroService.data;
  }

  solveProblemUI(){
    //console.log("data",this.data);
    this.hungaroService.solveProblemUI();
  }

  decrementNumofN(){
    if(this.hungaroService.numN > 2){
      this.hungaroService.numN--;
      this.hungaroService.refreshData();
    }
  }
  incrementNumofN(){
    this.hungaroService.numN++;
    this.hungaroService.refreshData();
  }
  decrementNumofM(){
    if(this.hungaroService.numM > 2){
      this.hungaroService.numM--;
      this.hungaroService.refreshData();
    }
  }
  incrementNumofM(){
    this.hungaroService.numM++;
    this.hungaroService.refreshData();
  }
  

  updateValue(value,n,m){
    console.log(value,n,m);
    
    this.data[n][m] = value; 
  }
//Esta funcion se dispara al perder cada elemento el focus para acualizar el valor en la tabla del servicio
  //Por alguna razon no funcionaba el biding
  aux = "";

  checkFocus(n,m,val){
    this.aux = val ;
    //this.hungaroService.data[n][m] = Number(val);
    //console.log(this.aux);
  }
  actVal(n,m){
    this.hungaroService.data[n][m] = Number(this.aux);
    //console.log(this.hungaroService.data);
  }
}
