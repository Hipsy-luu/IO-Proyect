import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DrawGraphPage } from "../pages/draw-graph/draw-graph.page"


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    opcGraph = "djistra";
    constructor(private modalController: ModalController) { }

    async presentModal() {
        const modal = await this.modalController.create({
            component: DrawGraphPage
        });

        await modal.present();
    }
}
