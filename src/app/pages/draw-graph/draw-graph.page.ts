import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use(edgehandles);

import { AddNodePage } from '../add-node/add-node.page';
import { EdgeWeightComponent } from '../../../components/edge-weight/edge-weight.component';

@Component({
    selector: 'app-draw-graph',
    templateUrl: './draw-graph.page.html',
    styleUrls: ['./draw-graph.page.scss'],
})
export class DrawGraphPage implements OnInit {
    cy;

    constructor(private modalController: ModalController, public toastController: ToastController, public popoverController: PopoverController) { }

    goHome() {
        this.modalController.dismiss();
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.setupGraph();
    }

    async presentEdgeWeightPopover(edgeId: string) {
        const popover = await this.popoverController.create({
            component: EdgeWeightComponent,
            translucent: true,
            animated: true,
            backdropDismiss: false
        });

        await popover.present();

        const { data } = await popover.onDidDismiss();

        let edge = this.cy.edges('[id = "' + edgeId + '"]');

        if (data.weight !== undefined) {
            edge.data("label", data.weight)
                .data("weight", data.weight)
                .data("id", edgeId + data.weight);
        }
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1000
        });
        await toast.present();
    }

    setupGraph() {
        this.cy = cytoscape({
            container: document.getElementById('cy'),

            layout: {
                name: 'grid',
                rows: 2,
                cols: 2
            },

            style: [
                {
                    selector: 'node[name]',
                    style: {
                        'content': 'data(name)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'label': 'data(label)',
                        'curve-style': 'bezier',
                        'target-arrow-shape': 'triangle'
                    }
                },

                // some style for the extension

                {
                    selector: '.eh-handle',
                    style: {
                        'background-color': 'red',
                        'width': 12,
                        'height': 12,
                        'shape': 'ellipse',
                        'overlay-opacity': 0,
                        'border-width': 12, // makes the handle easier to hit
                        'border-opacity': 0
                    }
                },

                {
                    selector: '.eh-hover',
                    style: {
                        'background-color': 'red'
                    }
                },

                {
                    selector: '.eh-source',
                    style: {
                        'border-width': 2,
                        'border-color': 'red'
                    }
                },

                {
                    selector: '.eh-target',
                    style: {
                        'border-width': 2,
                        'border-color': 'red'
                    }
                },

                {
                    selector: '.eh-preview, .eh-ghost-edge',
                    style: {
                        'background-color': 'red',
                        'line-color': 'red',
                        'target-arrow-color': 'red',
                        'source-arrow-color': 'red'
                    }
                },

                {
                    selector: '.eh-ghost-edge.eh-preview-active',
                    style: {
                        'opacity': 0
                    }
                }
            ]
        });

        let out = this;

        let trigger = {
            complete: function(sourceNode, targetNode, addedEles) {
                let sourceId = sourceNode._private.data.id;
                let targetId = targetNode._private.data.id;
                let edgeId = sourceId + "->" + targetId + ":";
                addedEles["0"]._private.data.id = edgeId;
                out.presentEdgeWeightPopover(edgeId);
            }
        };

        var eh = this.cy.edgehandles(trigger);
    }

    async addNode() {
        const modal = await this.modalController.create({
            component: AddNodePage
        });

        await modal.present();

        const nodeData = await modal.onDidDismiss();
        console.log(nodeData);

        if (nodeData.data != null) {
            this.cy.add(nodeData);
            this.cy.center();
            let nodes = this.cy.nodes();
            let edges = this.cy.edges();
        }
    }

    removeNode() {
        let noneSelectedMsg = "Please select a node or edge.";
        let deletedMsg = "Element removed successfully.";
        let element = this.cy.$(':selected');

        if (element.length == 0) {
            this.presentToast(noneSelectedMsg);
        } else {
            element.remove();
            this.presentToast(deletedMsg);
        }
    }

    recenter() {
        this.cy.center();
        this.cy.fit();
    }

    solve() {
        alert("TODO");
    }
    //Aqui nomas mandamos a llamar los metodos de los algoritmos y ya en otro lado los definimos
    //Todo sea por un código mas L I M P I O
    optionHandler(option){
        switch(option) {
            case "RCorta": {
               //statements;
               break;
            }
            case "MSATree": {
               //statements;
               break;
            }
            case "RCritica":{
                //statements;
                break;
            }
        }
    }

}
