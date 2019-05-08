import { Injectable } from '@angular/core';
import * as MunkresJs from 'munkres-js';

@Injectable({
  providedIn: 'root'
})
export class HungaroComponentServiceService {
  resultReady = false;
  numM: number;
  numN: number;
  data = [];
  dataResult = [];

  constructor() {
    this.numM = 2;
    this.numN = 2;
    this.refreshData();
  }

  testUpdate( index , obj){
    return 'test'+ index;
  }
  //
  //*Esta funcion sirve para crear los arreglos donde se guardaran los datos
  //*Los datos se reinician a 0 cada vez que se cambia la variable numN o numM
  //
  refreshData(){
    this.data = [];
    this.dataResult = [];
    
    for (let n = 0; n <this.numN ; n++) {
      
      var dataM = [];
      for (let m = 0; m <this.numM ; m++) {
        dataM.push(0);
      }
      this.dataResult.push(dataM);

      dataM = [];
      for (let m = 0; m <this.numM ; m++) {
        dataM.push(0);
      }
      this.data.push(dataM);
    }
    //Ejemplos de la clase (Apuntes de Julieta)
    /*this.data.push(
      [145, 122, 130, 95, 115],
      [86, 63, 85, 48, 78 ],
      [121, 107, 93, 69, 95],
      [119, 83, 116, 80, 105],
      [97, 76, 120, 80, 111]
    );*/
    
    /*this.data.push(
      [65,73,63,57,0,0],
      [67,70,65,58,0,0],
      [68,72,69,55,0,0],
      [67,73,70,59,0,0],
      [71,69,75,57,0,0],
      [69,71,66,59,0,0]
      );*/
    this.resultReady = false;
    //console.log(this.dataResult);
  }

  solveProblemUI(){
    this.resultReady = false;
    try {
      //console.log(this.data);
      //Se borra y rellena de 0 la tabla de resultados
      this.dataResult = [];
    
      for (let n = 0; n <this.numN ; n++) {
        var dataM = [];
        for (let m = 0; m <this.numM ; m++) {
          dataM.push(0);
        }
        this.dataResult.push(dataM);
      }
      //Con este metodo se crea un arreglo donde se guardan los indices de las tareas optimas
      var munkres = new MunkresJs(this.data);
      //Se guardan los resultados de la matriz en la nueva para dejar solo los optimos
      for (let index = 0; index < munkres.length; index++) { 
        this.dataResult[ munkres[index][1] ][ munkres[index][0] ] = this.data[ munkres[index][1] ][ munkres[index][0] ];
      }
      this.resultReady = true;
      console.log(this.dataResult);
    } catch (error) {
      this.resultReady = false;
    }
  }
}
