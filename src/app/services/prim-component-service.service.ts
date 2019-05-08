import { Injectable } from '@angular/core';
//Libreria para aplicar djistra
import * as JsGraphAlgorithms from 'js-graph-algorithms';

@Injectable({
  providedIn: 'root'
})
export class PrimComponentServiceService {
  
  numVert : number;
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
    this.numVert = 2;
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
    this.g = new JsGraphAlgorithms.WeightedGraph(this.numVert);//Numero de vertices en el grafo
    this.result = [];
    
    //Se añaden las conecciones al grafo
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
   /* Descomentar esta parte y comentar el "if(this.conections.length>0)" para pruebas rapidas
    this.numVert = 8;
    this.g.addEdge(new JsGraphAlgorithms.Edge(0, 7, 0.16));
    this.g.addEdge(new JsGraphAlgorithms.Edge(2, 3, 0.17));
    this.g.addEdge(new JsGraphAlgorithms.Edge(1, 7, 0.19));
    this.g.addEdge(new JsGraphAlgorithms.Edge(0, 2, 0.26));
    this.g.addEdge(new JsGraphAlgorithms.Edge(5, 7, 0.28));
    this.g.addEdge(new JsGraphAlgorithms.Edge(1, 3, 0.29));
    this.g.addEdge(new JsGraphAlgorithms.Edge(1, 5, 0.32));
    this.g.addEdge(new JsGraphAlgorithms.Edge(2, 7, 0.34));
    this.g.addEdge(new JsGraphAlgorithms.Edge(4, 5, 0.35));
    this.g.addEdge(new JsGraphAlgorithms.Edge(1, 2, 0.36));
    this.g.addEdge(new JsGraphAlgorithms.Edge(4, 7, 0.37));
    this.g.addEdge(new JsGraphAlgorithms.Edge(0, 4, 0.38));
    this.g.addEdge(new JsGraphAlgorithms.Edge(6, 2, 0.4));
    this.g.addEdge(new JsGraphAlgorithms.Edge(3, 6, 0.52));
    this.g.addEdge(new JsGraphAlgorithms.Edge(6, 0, 0.58));
    this.g.addEdge(new JsGraphAlgorithms.Edge(6, 4, 0.93));*/
    //Se resuelve 
    var prim = new JsGraphAlgorithms.EagerPrimMST(this.g); 
    var mst = prim.mst;
    var dist = 0;
    if(mst.length > 0){//Se comprueba que exista resultado
      for(var i=0; i < mst.length; ++i) {
        var e = mst[i];
        var v = e.either();
        var w = e.other(v);
        this.result.push('--' + this.dictionary[v] + ' => ' + this.dictionary[w] + ': ' + e.weight);
        console.log('(' + this.dictionary[v] + ', ' + this.dictionary[w] + '): ' + e.weight);
        dist += e.weight;
      }
      this.result.push( "Distancia: '"  + dist + "'");
      console.log('=====Distancia: '  + dist + '=========');
    
    }
    
    this.showResult = true;
  }
}
