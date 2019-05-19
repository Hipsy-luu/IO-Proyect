import { Injectable } from '@angular/core';
//Libreria para aplicar djistra
import * as JsGraphAlgorithms from 'js-graph-algorithms';

@Injectable({
  providedIn: 'root'
})
export class DjistraComponentServiceService {
  numVert : number;
  vertOrig : number;
  vertDest : number;
  from;
  to;
  //Grafo donde guardamos y añadimos valores
  g;

  showResult = false;
  result = []

  conections = [];
  vertices = [];
  dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
    'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  //Esta funcion es importante ya que si no el servicio entra vacio al programa
  //Como el servicio no tiene constructor por eso se debe de mandar llamar
  //principalmente porque no se refrescan los vertices si no se corre
  startService() { 
    this.numVert = 1;
    this.from = "a";
    this.to = "a";
    this.refreshVertices();
   }

   decrementNumofVar(opc: number){
    switch (opc) {
      case 0:
        if(this.numVert>1){//No se permite que el valor sea menor que 1
          this.numVert--;
        }
        break;
    
      default:
        break;
    }
    this.refreshVertices();
  }

  incrementNumofVar(opc: number){
    switch (opc) {
      case 0:
        this.numVert++;
        break;
    
      default:
        break;
    }
    this.refreshVertices();
  }

  refreshVertices(){
    this.vertices = [];
    for (let index = 0; index < this.numVert; index++) {
      this.vertices.push(this.dictionary[index]);
    }
    //console.log(this.vertices);
  }

  addConection(from:number, to:number , value:number){
    this.conections.push([from, to , value]);
  }

  clearConecctions(){
    this.conections = [];
  }


  solve(){
    this.g = new JsGraphAlgorithms.WeightedDiGraph(this.numVert);//Numero de vertices en el grafo
    this.result = [];
    
    if(this.conections.length>0){
      for (let index = 0; index < this.conections.length; index++) {
        console.log("Coneccion numero "+index);
        this.g.addEdge(new JsGraphAlgorithms.Edge(
          this.dictionary.indexOf( this.conections[index][0]), 
          this.dictionary.indexOf( this.conections[index][1]), 
          Number( this.conections[index][2]) ) );
          //Se añaden al derecho y al revez para que pueda pasar en ambos sentidos
        this.g.addEdge(new JsGraphAlgorithms.Edge(
          this.dictionary.indexOf( this.conections[index][1]), 
          this.dictionary.indexOf( this.conections[index][0]), 
          Number( this.conections[index][2]) ) );
      }
      console.log( "Conecciones " + this.conections);
    }
     
    var origen = this.dictionary.indexOf(this.from);
    var dijkstra = new JsGraphAlgorithms.Dijkstra(this.g, origen);//Aqui se dice que el nodo de inicio es el 0
    var destino = this.dictionary.indexOf(this.to); //Variable para el destino
    if(dijkstra.hasPathTo(destino)){//Se comprueba si se tiene un destino o una ruta hacia el
        var path = dijkstra.pathTo(destino);
        this.result.push( "Ruta desde '" + this.dictionary[origen] + "' Hacia '" + this.dictionary[destino] + "'");
        console.log('=====Ruta desde ' + this.dictionary[origen] + ' Hacia ' + this.dictionary[destino] + ' ==========');
        for(var i = 0; i < path.length; ++i) {
            var e = path[i];
            this.result.push('--' + this.dictionary[e.from()] + ' => ' + this.dictionary[e.to()] + ': ' + e.weight);
            console.log( this.dictionary[e.from()] + ' => ' + this.dictionary[e.to()] + ': ' + e.weight);
        }
        this.result.push( "Distancia: '"  + dijkstra.distanceTo(destino) + "'");
        console.log('=====Distancia: '  + dijkstra.distanceTo(destino) + '=========');
    }

    this.showResult = true;
  }
}
