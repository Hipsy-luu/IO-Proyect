import { Injectable } from '@angular/core';
//Libreria para el metodo simplex
import * as SimpleSimplex from 'simple-simplex';

@Injectable({
  providedIn: 'root'
})
export class SimplexTabService {
  numVar;
  numRest;
  optimizationType;
  objectiveEc = [];

  constraints = [];

  solution = {
    isOptimal : false,
    
    solution : {
      coefficients : "",
      optimum : 0
    }
  };
  coefficients;
  constructor() {
    this.numVar = 2;
    this.numRest = 2;
    this.optimizationType = 'max';
    this.objectiveEc = [{"val" : "0"},{"val" : "0"}];
    
    this.refreshVariables();
  }

  refreshVariables(){
    //Copiamos el array de las variables de la ecuacion objetivo
    //para que no se borren cada vez que cambiamos el numero de variables
    var objectiveEcAnt = [...this.objectiveEc];
    //console.log("Anterior");
    //console.log( objectiveEcAnt ) ;
    //Se eliminan los valores anteriores de la ecuacion objetivo
    this.objectiveEc = [];
    for (let index = 0; index < this.numVar; index++) {
      if( objectiveEcAnt.length < this.numVar && index == objectiveEcAnt.length){
        this.objectiveEc.push( {"val" : "0"} );
      }else{
        this.objectiveEc.push( objectiveEcAnt[index] );
      }
    }
    //console.log("Actual");
    //console.log(this.objectiveEc);  
    this.refreshConstraints();
  }

  refreshConstraints(){
    this.constraints = [];
    var namedVectorConst = [];
    
    for (let index = 0; index < this.numRest; index++) {
      namedVectorConst = [];
      for (let index = 0; index < this.numVar; index++) {
        namedVectorConst.push( {"val" : "0"} );
      }
      this.constraints.push( {
          namedVector: [...namedVectorConst],
          constraint: '<=',
          constant: 0,
        } 
      );
    }
  }

  solveProblemUI(){
    //Construccion del objeto con las variables y los numeros de la ecuacion objetivo
    //Para alimentar el metodo solve
    let dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
    'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let objectiveEcCons = [];
    for(var i = 0; i< this.objectiveEc.length ; i++){
      //Se multiplica por menos uno si se quiere minimizar
      if(this.optimizationType == 'min'){
        objectiveEcCons[dictionary[i]] = (-1)*(parseInt( this.objectiveEc[i].val));
      }else{
        objectiveEcCons[dictionary[i]] = parseInt( this.objectiveEc[i].val);
      }
      
    }
    
    //Reconstruccion de las restricciones para darle el formato que pide la libreria
    let constraintsCons = [];
    let namedVectorCons = {};
    for (let index = 0; index < this.constraints.length; index++) {
      namedVectorCons = {};
      for(var i = 0; i<this.constraints[index].namedVector.length; i++){
        namedVectorCons[dictionary[i]] = parseInt( this.constraints[index].namedVector[i].val);
        
      }
      constraintsCons.push({
        namedVector: namedVectorCons,
        constraint: this.constraints[index].constraint,
        constant: parseInt(this.constraints[index].constant),
      });
    }
    //console.log(this.optimizationType);
    //Se intenta llegar con la solucion si no se puede solo no se muestra
    try {
      //Aqui se manda llamar el objeto que puede resolver el problema
      const solver = new SimpleSimplex({
        objective: objectiveEcCons,
        constraints: constraintsCons,
        optimizationType: 'max', //Siempre debe ser max
      });
      // call the solve method with a method name
      var result = solver.solve({
        methodName: 'simplex',
      });
      
      // see the solution and meta data
      /*console.log({
        solution: result.solution,
        isOptimal: result.details.isOptimal,
      });*/
      
      this.solution.isOptimal = result.details.isOptimal;
      this.solution.solution.coefficients = JSON.stringify(result.solution.coefficients);
      this.solution.solution.optimum = result.solution.optimum;
    } catch (error) {
      this.solution = {
        isOptimal : false,
        
        solution : {
          coefficients : "",
          optimum : 0
        }
      };
    }

  }
}
