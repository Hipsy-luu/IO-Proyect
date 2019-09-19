import { Injectable } from '@angular/core';
//Libreria para el metodo simplex
import * as SimplexSolver from 'simplex-solver';

@Injectable({
  providedIn: 'root'
})
export class BranchBoundServiceService {

  numVar;
  numRest;
  maxU;
  minF;
  actNode : number;
  optimizationType;
  objectiveEc = [];
  resultadoNodos = [{
    nodo : 0,
    actualU : 0,
    constraitOfNode : "",
    final : "",
    values : [{
      variable : "",
      constraint: "",
      constant: 0
    }]
  }];

  dictionary = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9', 'X10', 'X11', 'X12', 
    'X13', 'X14', 'X15', 'X16', 'X17', 'X18', 'X19', 'X20', 'X21', 'X22', 'X23', 'X24', 'X25', 'X26', 'X27'];

  constraints = [{
    namedVector: [{"val": "0"}],
    constraint: '<=',
    constant: 0,
  }];

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

  coefficients;

  constructor() {
    this.numVar = 2;
    this.numRest = 2;
    this.optimizationType = 'max';
    this.objectiveEc = [{"val" : "1"},{"val" : "5"}];
    
    this.refreshVariables();
    //Comentar la siguiente igualacion para dejar arreglo sin datos 
    this.constraints = [
    {
      namedVector: [{"val": "11"},{"val": "6"}],
      constraint: '<=',
      constant: 66,
    },
    {
      namedVector: [{"val": "5"},{"val": "50"}],
      constraint: '<=',
      constant: 225,
    }]
  }

  refreshVariables(){
    //Copiamos el array de las variables de la ecuacion objetivo
    //para que no se borren cada vez que cambiamos el numero de variables
    var objectiveEcAnt = [...this.objectiveEc];
    ////console.log("Anterior");
    ////console.log( objectiveEcAnt ) ;
    //Se eliminan los valores anteriores de la ecuacion objetivo
    this.objectiveEc = [];
    for (let index = 0; index < this.numVar; index++) {
      if( objectiveEcAnt.length < this.numVar && index == objectiveEcAnt.length){
        this.objectiveEc.push( {"val" : "0"} );
      }else{
        this.objectiveEc.push( objectiveEcAnt[index] );
      }
    }
    ////console.log("Actual");
    ////console.log(this.objectiveEc);  
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
    this.actNode = 0;
    this.resultadoNodos = [{
      nodo : 0,
      actualU : 0,
      constraitOfNode : "",
      final : "",
      values : [{
        variable : "",
        constraint: "",
        constant: 0
      }]
    }];

    //Se re inicializa todo cada que se preciona el boton
    this.maxU = 0;
    this.minF  = 0;
    this.resultadoNodos = [{
      nodo : 0,
      actualU : 0,
      constraitOfNode : "",
      final : "",
      values : [{
        variable : "",
        constraint: "",
        constant: 0
      }]
    }];

    this.solution = {
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
    //Se copian los constrain para no modificar los originales
    this.solveProblemBranchBound(this.objectiveEc,[...this.constraints],0,"NO");
  }

  //Genera la ecuacion objetivo en formato de string
  createEcObj(objectiveEc){
    //Construccion del objeto con las variables y los numeros de la ecuacion objetivo
    //Para alimentar el metodo solve
    var ecObj = "";
    for(var i = 0; i< objectiveEc.length ; i++){
      //Se multiplica por menos uno si se quiere minimizar
      if(this.optimizationType == 'min'){
        ecObj += (-1)*(parseFloat( objectiveEc[i].val)) + this.dictionary[i];
      }else{
        ecObj += (parseFloat( objectiveEc[i].val)) + this.dictionary[i];
      }
      if(( i + 1 ) < objectiveEc.length){
        ecObj += " + ";
      }
    }
    ////console.log(ecObj);
    return ecObj;
  }

  //Genera un arreglo de Strings con las restricciones en el en formato de ecuacion
  createConstraintsStr(constraints){
    //Reconstruccion de las restricciones en formato de strig para darle el formato que pide la libreria
    let namedVectorCons = {};
    let constraintsStr = [];
    var ecCons = "";
    
    for (let index = 0; index < constraints.length; index++) {
      namedVectorCons = {};
      ecCons = "";
      for(var i = 0; i<constraints[index].namedVector.length; i++){
        namedVectorCons[this.dictionary[i]] = parseInt( constraints[index].namedVector[i].val);
        ecCons += parseFloat( constraints[index].namedVector[i].val) + this.dictionary[i];
        if(( i + 1 ) < constraints[index].namedVector.length){
          ecCons += " + ";
        }
      }
      constraintsStr.push( ecCons + constraints[index].constraint + parseFloat(constraints[index].constant) );
    }
    ////console.log(constraintsStr);
    return constraintsStr;
  }

  newRow(variableNum , constraint : string , constant : number){
    let namedVectorConst = [];
    for (let index = 0; index < this.numVar; index++) {
      namedVectorConst.push( {"val" : "0"} );
    }
    namedVectorConst[variableNum].val = "1";
    return  {
              namedVector: [...namedVectorConst],
              constraint: constraint,
              constant: constant,
            } 
  }

  //Recibimos la ecuacion objetivo en formato aceptable por la lireria (ejemplo : '2x + 3y + 4z') en string y 
  //tambien los constraints en fotmato ese mismo formato pero cada uno en una casilla diferente del arreglo de Strings por ejemplo 
  /*constraints =  [
      '3x + 2y + z <= 10',
      '2x + 5y + 3z <= 15'
    ]*/
  solveProblemBranchBound(objectiveEc, constraints, actVar : number,valueConstrantNode : string){
    ////console.log(objectiveEc);
    ////console.log(constraints);
    this.solution.result = SimplexSolver.maximize(
      this.createEcObj(objectiveEc), 
      this.createConstraintsStr(constraints)
    );
    //Si la solucion es indefinida se termina el bucle
    if(this.solution.result){
      //Se tranforma el resultado en array para poder sacar las cosas importantes de el
      this.solution.solution.result = Object.values(this.solution.result);
      ////console.log(this.solution.solution.result);
      //Se crea un arreglo con los resultados del arreglo
      this.solution.solution.resultVariables = [];
      for (let index = 2; index < this.solution.solution.result.length; index++) {
        this.solution.solution.resultVariables.push( this.solution.solution.result[index].toFixed(2) );
      }
      this.solution.isOptimal = true;
      //Se cargan las iteraciones
      this.solution.solution.iteraciones = this.solution.solution.result[0];
      ////console.log(this.solution.solution.iteraciones);
      //Se recoge el valor optimo 
      this.solution.solution.optimum = this.solution.result["max"];
      ////console.log(this.solution);

      
      //Se escriben los datos del primer bloque 
      let lowValue = Math.trunc( Number(this.solution.result[this.dictionary[actVar]]) );
      let MaxValue = lowValue + 1;
      //Se recoge el valor de la actual U
      let actualU = this.solution.result["max"];
      //Se crean agregan las nuevas restricciones segun los valores nuevos de la actual variable
      let nextLowConstraints = [...constraints];
      let nextMaxConstraints = [...constraints];
      nextLowConstraints.push(this.newRow(actVar,'<=',lowValue));
      nextMaxConstraints.push(this.newRow(actVar,'>=',MaxValue));

      //Se verifica si es el primer estado para recoger el valor de F y para la primera U
      if(this.actNode == 0){
        //Evaluacion de la actual F para saber el limite inferior factible *SOLO DE CALCULA UNA VEZ SEGUN LA EXPLICACION*
        this.minF = 0;
        for(let i = 0; i < this.numVar;i++){
          this.minF = this.minF + ( Math.trunc( Number(this.solution.result[this.dictionary[i]])) * Number(this.objectiveEc[i].val) );
        }
        //actual U para saber el limite superior factible
        this.maxU = this.solution.result["max"];
        
        this.printDataNode(this.actNode,actualU,lowValue,MaxValue);
        this.actNode = this.actNode + 1;
        //Se recojen los resultados
        let resultValues = [];
        let fact = "";
        let compEntero : Number = 0;
        for(let index = 0; index < this.numVar; index++){
          resultValues.push(this.solution.result[this.dictionary[index]]);
          compEntero = compEntero + this.solution.result[this.dictionary[index]] - Math.trunc(this.solution.result[this.dictionary[index]]);
        }
        if(compEntero==0){
          fact = "--Factible ";
        }
        this.resultadoNodos = [{
          nodo : this.actNode,
          actualU : actualU,
          constraitOfNode : valueConstrantNode,
          final : fact + "Primer Nodo",
          values : resultValues
        }];

        this.solveProblemBranchBound(objectiveEc,[...nextLowConstraints],actVar, this.dictionary[actVar] + "<=" + lowValue);
        this.solveProblemBranchBound(objectiveEc,[...nextMaxConstraints],actVar, this.dictionary[actVar] + ">=" + MaxValue);
      }else{
        this.printDataNode(this.actNode,actualU,lowValue,MaxValue);
        this.actNode = this.actNode + 1;
        //Se verifica que este dentro de la solucion
        if(actualU > this.maxU || actualU < this.minF){
          //console.log("Nodo Final(T)");
          let resultValues = [];
          for(let index = 0; index < this.numVar; index++){
            resultValues.push(this.solution.result[this.dictionary[index]]);
          }
          this.resultadoNodos .push({
            nodo : this.actNode,
            actualU : actualU,
            constraitOfNode : valueConstrantNode,
            final : "Fuera de Rango - Final(T)",
            values : resultValues
          });
        }else{
          //AQUI 
          //Se comprueba si la variable actual ya salio entera
          let compEntero : Number = this.solution.result[this.dictionary[actVar]] - Math.trunc(this.solution.result[this.dictionary[actVar]]);
          if(compEntero == 0){
            //Como se cambio de variable hay que recalcular los nuevos constrain y los valores min y max de la actual variable
            actVar++;
            //Si se acaban las variables se detiene el bucle
            if(actVar < this.numVar){
              //console.log("Siguiente Variable");
              let resultValues = [];
              let fact = "";
              let compEntero : Number = 0;
              for(let index = 0; index < this.numVar; index++){
                resultValues.push(this.solution.result[this.dictionary[index]]);
                compEntero = compEntero + this.solution.result[this.dictionary[index]] - Math.trunc(this.solution.result[this.dictionary[index]]);
              }
              if(compEntero==0){
                fact = "--Factible ";
              }
              this.resultadoNodos .push({
                nodo : this.actNode,
                actualU : actualU,
                constraitOfNode : valueConstrantNode,
                final : fact + "Siguiente Variable - "+ this.dictionary[actVar],
                values : resultValues
              });
              lowValue = Math.trunc( Number(this.solution.result[this.dictionary[actVar]]) );
              MaxValue = lowValue + 1;
              nextLowConstraints = [...constraints];
              nextMaxConstraints = [...constraints];
              nextLowConstraints.push(this.newRow(actVar,'<=',lowValue));
              nextMaxConstraints.push(this.newRow(actVar,'>=',MaxValue));
              this.solveProblemBranchBound(objectiveEc,[...nextLowConstraints],actVar, this.dictionary[actVar] + "<=" + lowValue);
              this.solveProblemBranchBound(objectiveEc,[...nextMaxConstraints],actVar, this.dictionary[actVar] + ">=" + MaxValue);
            }else{
              ////console.log("Termino sin mas variables");
              //console.log("Nodo Final(T)");
              let resultValues = [];
              let fact = "";
              let compEntero : Number = 0;
              for(let index = 0; index < this.numVar; index++){
                resultValues.push(this.solution.result[this.dictionary[index]]);
                compEntero = compEntero + this.solution.result[this.dictionary[index]] - Math.trunc(this.solution.result[this.dictionary[index]]);
              }
              if(compEntero==0){
                fact = "--Factible ";
              }
              this.resultadoNodos .push({
                nodo : this.actNode,
                actualU : actualU,
                constraitOfNode : valueConstrantNode,
                final : fact + "Sin mas variables - Final(T)",
                values : resultValues
              });
            }
          }else{
            //Comprobar que sirve la siguiente iteracion
            //console.log("Siguiente Iteracion");
            let resultValues = [];
            let fact = "";
            let compEntero : Number = 0;
            for(let index = 0; index < this.numVar; index++){
              resultValues.push(this.solution.result[this.dictionary[index]]);
              compEntero = compEntero + this.solution.result[this.dictionary[index]] - Math.trunc(this.solution.result[this.dictionary[index]]);
            }
            if(compEntero==0){
              fact = "--Factible ";
            }
            this.resultadoNodos .push({
              nodo : this.actNode,
              actualU : actualU,
              constraitOfNode : valueConstrantNode,
              final : fact + "Siguiente Iteracion con "+ this.dictionary[actVar],
              values : resultValues
            });
            this.solveProblemBranchBound(objectiveEc,[...nextLowConstraints],actVar, this.dictionary[actVar] + "<=" + lowValue);
            this.solveProblemBranchBound(objectiveEc,[...nextMaxConstraints],actVar, this.dictionary[actVar] + ">=" + MaxValue);
          }
        }
      }
    }else{
      //Se incrementa por ser el siguiente nodo aque diera error sigue contando como un nodo
      this.actNode++;
      //console.log(this.actNode+" Nodo");
      //console.log("Infactible");
      //console.log("Nodo Final(T)");
      let resultValues = [];
      for(let index = 0; index < this.numVar; index++){
        resultValues.push(0);
      }
      this.resultadoNodos.push({
        nodo : this.actNode,
        actualU : 0,
        constraitOfNode : valueConstrantNode,
        final : "Infactible - Final(T)",
        values : resultValues
      });
    }
  }

  printDataNode(nodeNum,actualU,lowValue,MaxValue){
    //console.log((nodeNum+1)+" Nodo");
    if(this.actNode == 0){
      //console.log("Limite Superior U = " + actualU);
      //console.log("Limite Inferior F = " + this.minF);
    }else{
      //console.log("Actual U = " + actualU);
    }
    
    ////console.log("NexLow = " + lowValue);
    ////console.log("NexMax = " + MaxValue);
    for(let index = 0; index < this.numVar; index++){
      //console.log(this.dictionary[index] +" " + this.solution.result[this.dictionary[index]]);
    }
  }
}
