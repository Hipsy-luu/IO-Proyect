import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
    selector: 'app-initial-final-node',
    templateUrl: './initial-final-node.component.html',
    styleUrls: ['./initial-final-node.component.scss'],
})
export class InitialFinalNodeComponent implements OnInit {

    n = []

    constructor(private navParams: NavParams, private popoverController: PopoverController) { }

    ngOnInit() {
        let nodes = this.navParams.get('nodes');

        for (var _i = 0; _i < nodes.length; _i++) {
            this.n.push(nodes[_i]._private.data);
        }

        console.log(this.n);
    }

    cancel() {
        this.popoverController.dismiss();
    }



}
