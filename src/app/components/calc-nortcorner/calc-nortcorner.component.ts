import { Component, OnInit } from '@angular/core';
//Servicio para el componente
//Les recomiendo poner todo lo referente a este metodo aqui
import { NortcornerComponentServiceService } from './../../services/nortcorner-component-service.service';

@Component({
    selector: 'app-calc-nortcorner',
    templateUrl: './calc-nortcorner.component.html',
    styleUrls: ['./calc-nortcorner.component.scss'],
})
export class CalcNortcornerComponent implements OnInit {

    MAX = 10;
    ready: boolean = false;

    constructor(public northwestService: NortcornerComponentServiceService) { }

    ngOnInit() {
        console.log(this.northwestService.feasible[0].stock);
        this.ready = false;
    }

    decrementStockSize() {
        if (this.northwestService.stockSize - 1 >= 2) {
            this.northwestService.stockSize -= 1;
            this.northwestService.cleanStock();
            this.northwestService.cleanCost();
            this.northwestService.setFeasible();
        }
    }

    incrementStockSize() {
        if (this.northwestService.stockSize + 1 <= this.MAX) {
            this.northwestService.stockSize += 1;
            this.northwestService.cleanStock();
            this.northwestService.cleanCost();
            this.northwestService.setFeasible();
        }
    }

    decrementRequiredSize() {
        if (this.northwestService.requiredSize - 1 >= 2) {
            this.northwestService.requiredSize -= 1;
            this.northwestService.cleanRequired();
            this.northwestService.cleanCost();
            this.northwestService.setFeasible();
        }
    }

    incrementRequiredSize() {
        if (this.northwestService.requiredSize + 1 <= this.MAX) {
            this.northwestService.requiredSize += 1;
            this.northwestService.cleanRequired();
            this.northwestService.cleanCost();
            this.northwestService.setFeasible();
        }
    }

    solve() {
        this.ready = true;
        console.log(this.northwestService.cost);
        this.northwestService.leastCostRule();
        console.log(this.northwestService.getSolution());
        this.northwestService.buildSolutionMatrix();
        this.ready = false;
    }
}
