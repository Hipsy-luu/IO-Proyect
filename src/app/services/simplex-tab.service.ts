import { Injectable } from '@angular/core';
//Libreria para el metodo simplex
import * as SimplexSolver from 'simplex-solver';

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
      result : [],
      resultVariables : [],
      iteraciones : [{
        variables : [
          'a'
        ],
        pivot : {
          row : 0,
          column : 0
        }
      }],
      optimum : 0
    },
    result : {
      tableaus: [], 
      max: 0,
      a: 0, 
      b: 0}
  };

 ;

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
    let dictionary = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9', 'X10', 'X11', 'X12', 
    'X13', 'X14', 'X15', 'X16', 'X17', 'X18', 'X19', 'X20', 'X21', 'X22', 'X23', 'X24', 'X25', 'X26', 'X27'];
    var ecObj = "";
    for(var i = 0; i< this.objectiveEc.length ; i++){
      //Se multiplica por menos uno si se quiere minimizar
      if(this.optimizationType == 'min'){
        ecObj += (-1)*(parseFloat( this.objectiveEc[i].val)) + dictionary[i];
      }else{
        ecObj += (parseFloat( this.objectiveEc[i].val)) + dictionary[i];
      }
      if(( i + 1 ) < this.objectiveEc.length){
        ecObj += " + ";
      }
    }
    //console.log(ecObj);
    
    //Reconstruccion de las restricciones para darle el formato que pide la libreria
    let namedVectorCons = {};
    let constraintsStr = [];
    var ecCons = "";
    
    for (let index = 0; index < this.constraints.length; index++) {
      namedVectorCons = {};
      ecCons = "";
      for(var i = 0; i<this.constraints[index].namedVector.length; i++){
        namedVectorCons[dictionary[i]] = parseInt( this.constraints[index].namedVector[i].val);
        ecCons += parseFloat( this.constraints[index].namedVector[i].val) + dictionary[i];
        if(( i + 1 ) < this.constraints[index].namedVector.length){
          ecCons += " + ";
        }
      }
      constraintsStr.push( ecCons + this.constraints[index].constraint + parseFloat(this.constraints[index].constant) );
    }
    //console.log(constraintsStr);
    this.solution.result = SimplexSolver.maximize(ecObj, constraintsStr);
    //console.log(this.solution.result);
    //Se tranforma el resultado en array para poder sacar las cosas importantes de el
    this.solution.solution.result = Object.values(this.solution.result);
    //console.log(this.solution.solution.result);
    this.solution.solution.resultVariables = [];
    for (let index = 2; index < this.solution.solution.result.length; index++) {
      this.solution.solution.resultVariables.push( this.solution.solution.result[index].toFixed(2) );
    }
    this.solution.isOptimal = true;
    //Se cargan las iteraciones
    this.solution.solution.iteraciones = this.solution.solution.result[0];
    //console.log(this.solution.solution.iteraciones);
    //Se recoge el valor optimo 
    this.solution.solution.optimum = this.solution.result["max"];
    //console.log(this.solution.solution.resultVariables);
    

  }
}
