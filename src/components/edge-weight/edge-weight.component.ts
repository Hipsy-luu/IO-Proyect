import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-edge-weight',
    templateUrl: './edge-weight.component.html',
    styleUrls: ['./edge-weight.component.scss'],
})
export class EdgeWeightComponent implements OnInit {

    edgeWeight: number;
    edgeWeight2: number;

    constructor(private popoverController: PopoverController) { }

    ngOnInit() { }

    ok() {
        this.popoverController.dismiss({
            weight: this.edgeWeight,
            weight2: this.edgeWeight2
        });
    }

}
