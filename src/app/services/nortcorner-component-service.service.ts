import { Injectable } from '@angular/core';

class SentValue {
    required: number = 0;
    value: number = 0;
    stock: number = 0;

    constructor() { }
}

@Injectable({
    providedIn: 'root'
})

export class NortcornerComponentServiceService {
    required: number[] = new Array();
    stock: number[] = new Array();
    cost: number[][] = new Array();
    feasible: SentValue[] = new Array();
    solutionMatrix: number[][] = new Array();

    stockSize: number;
    requiredSize: number;

    constructor() {
        this.stockSize = 2;
        this.requiredSize = 2;
        this.cleanStock();
        this.cleanRequired();
        this.setFeasible();
        this.cleanCost();
    }

    cleanStock() {
        this.stock = []

        for (let i = 0; i < this.stockSize; i++) {
            this.stock.push(0);
        }
    }

    cleanRequired() {
        this.required = []

        for (let i = 0; i < this.requiredSize; i++) {
            this.required.push(0);
        }
    }

    setFeasible() {
        for (var i = 0; i < (this.stockSize + this.requiredSize - 1); i++) {
            this.feasible.push(new SentValue());
        }
    }

    cleanCost() {
        this.cost = []

        for (var i = 0; i < this.stockSize; i++) {
            this.cost[i] = [];

            for (var j = 0; j < this.requiredSize; j++) {
                this.cost[i].push(0);
            }
        }
    }

    leastCostRule() {
        let min: number;
        let k = 0;

        let isSet: boolean[][] = new Array();

        for (var _i = 0; _i < this.requiredSize; _i++) {
            isSet[_i] = [];

            for (var _j = 0; _j < this.stockSize; _j++) {
                isSet[_i][_j] = false;
            }
        }

        let i = 0;
        let j = 0;
        let minCost = new SentValue();

        while (k < (this.stockSize + this.requiredSize - 1)) {

            minCost.value = Number.MAX_VALUE;

            //picking up the least cost cell
            for (var m = 0; m < this.stockSize; m++) {
                for (var n = 0; n < this.requiredSize; n++) {
                    if (!isSet[m][n]) {
                        if (this.cost[m][n] < minCost.value) {
                            minCost.stock = m;
                            minCost.required = n;
                            minCost.value = this.cost[m][n];
                        }
                    }

                }
            }

            i = minCost.stock;
            j = minCost.required;

            //allocating stock in the proper manner
            if (this.required[j] < this.stock[i]) {
                min = this.required[j];
            } else {
                min = this.stock[i];
            }

            this.feasible[k].required = j;
            this.feasible[k].stock = i;
            this.feasible[k].value = min;
            k += 1;

            this.required[j] -= min;
            this.stock[i] -= min;

            //allocating null values in the removed row/column
            if (this.stock[i] == 0) {
                for (let l = 0; l < this.requiredSize; l++) {
                    isSet[i][l] = true;
                }
            }
            else {
                for (let l = 0; l < this.stockSize; l++) {
                    isSet[l][j] = true;
                }
            }
        }
    }

    getSolution() {
        let result = 0;

        for (let x of this.feasible) {
            result += x.value * this.cost[x.stock][x.required];
        }

        return result;
    }

    indexTracker(index, item) {
        return index;
    }

    buildSolutionMatrix() {
        for (var i = 0; i < this.stockSize; i++) {
            this.solutionMatrix[i] = [];

            for (var j = 0; j < this.requiredSize; j++) {
                this.solutionMatrix[i].push(0);
            }
        }

        for (let item of this.feasible) {
            this.solutionMatrix[item.stock][item.required] = item.value;
        }
    }
}
