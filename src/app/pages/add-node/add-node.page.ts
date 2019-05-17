import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-node',
    templateUrl: './add-node.page.html',
    styleUrls: ['./add-node.page.scss'],
})
export class AddNodePage implements OnInit {

    nodeName: string;
    nodeWeight: string;

    constructor(private modalController: ModalController, private toastController: ToastController) { }

    ngOnInit() {
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }

    close() {
        this.modalController.dismiss(null, undefined);
    }

    sendNodeInfo() {
        let addNodeNameMsg = "Please add the name of the node";

        if (this.nodeName === undefined || this.nodeName.replace(/\s/g, "") === "") {
            this.presentToast(addNodeNameMsg);
        } else {
            const data = {
                id: this.nodeName.replace(/\s/g, ""),
                name: this.nodeName.replace(/\s/g, ""),
                data: { weight: +this.nodeWeight },
                position: { x: 0, y: 0 }
            };

            this.modalController.dismiss(data);
        }

    }

}
