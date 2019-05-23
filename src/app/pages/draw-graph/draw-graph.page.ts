import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import PriorityQueue from 'node_modules\\javascript-algorithms-and-data-structures\\src\\data-structures\\priority-queue\\PriorityQueue.js';
import * as Collections from 'typescript-collections';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use(edgehandles);

import { AddNodePage } from '../add-node/add-node.page';
import { EdgeWeightComponent } from '../../../components/edge-weight/edge-weight.component';
import { InitialFinalNodeComponent } from '../../../components/initial-final-node/initial-final-node.component';


@Component({
    selector: 'app-draw-graph',
    templateUrl: './draw-graph.page.html',
    styleUrls: ['./draw-graph.page.scss'],
})
export class DrawGraphPage implements OnInit {
    cy;
    solveOption;

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

    async presentInitialFinalNodePopover(nodes: any) {
        const popover = await this.popoverController.create({
            component: InitialFinalNodeComponent,
            translucent: true,
            animated: true,
            componentProps: { nodes }
        });

        await popover.present();
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
    //Este metodo guarda la opcion que se seleccionó en el selector y cambia un poco el estilo visual dependiendo del método
    store(option){
        this.solveOption = option;
        if (option == 'MSTree'){
            this.cy.style().selector('edge').style({'target-arrow-shape' : 'none'}).update();
        }else{
            this.cy.style().selector('edge').style({'target-arrow-shape' : 'triangle'}).update();
        }
    }
    /**
     * Pinta las lineas y sus nodos conectados del grafo
     * @param aristas Es un arreglo de aristas resultado de algun metodo de los que estamos trabajando aqui
     * 
     */
    pintar(aristas){
        for (let i = 0; i < aristas.length; i++){
            //Por alguna razon el 'compilador' llora que porque no tiene metodo select, lo mas gracioso es que aun asi jala
            aristas[i].select();
            //Selecciono nodo inicial
            let split : Array<string> = aristas[i].data('id').split("->");
            this.cy.getElementById(
                split[0]
            ).select();

            //Selecciono nodo final
            this.cy.getElementById(
                //Como al la id es de la forma [nodo inicio] -> [nodo final]:, debo consultar la substring para obtener la pura id del nodo final
                split[1].substring(0,split[1].length-1)
            ).select();
        }
    }
    /**
     * Metodo para encontrar el arbol de expansión mínima del grafo utilizando el algoritmo de Prim
     * @param start Nodo de inicio
     */
    MSTree(start){
        //Inicializo las estructuras necesarias
        let MST = new Collections.LinkedList();
        let edgesQueue = new PriorityQueue();
        let visitedVertices = {};

        //Agrego el inicio como ya visitado
        visitedVertices[start.data('id')] = start;

        //Agrego todas las aristas conectadas al inicio a la cola de prioridad
        start.connectedEdges().forEach(function( ele ){
            edgesQueue.add(ele,ele.data('weight'));
          });
        
        //Exploramos todas las aristas encoladas
        while (!edgesQueue.isEmpty()){

            let currentMinEdge: any = edgesQueue.poll();

            let nextMinVertex = null;
            /**
             * Para saber los nodos conectados lo que hice fue obtener la Id
             * Como la id es de la forma {id_nodo_inicio}->{id_nodo_final}
             * entonces podemos saber por los index en la string las ids de los nodos
             */
            let split : Array<string> = currentMinEdge.data('id').split("->");
            if (!visitedVertices[split[0]]){
                nextMinVertex = this.cy.getElementById(split[0]);
            } else if (!visitedVertices[split[1]]){
                nextMinVertex = this.cy.getElementById(split[1].substring(0,split[1].length-1));
            }

            if (nextMinVertex){
                MST.add(currentMinEdge);
                visitedVertices[nextMinVertex.data('id')] = nextMinVertex;
                
                //Agrego todas las aristas conectadas a la cola de prioridad
                nextMinVertex.connectedEdges().forEach(function( ele ){
                    let aux = ele.data('id').split("->");
                    if (!visitedVertices[aux[0]] 
                        || !visitedVertices[aux[1].substring(0,aux[1].length-1)])
                    edgesQueue.add(ele,ele.data('weight'));
                });

            }
        }
        return MST.toArray();
    }
    //Por el momento funciona con el nodo de inicio en el seleccionado, no se como se podria implementar para elegir el nodo final
    solve() {
        let start = this.cy.$(':selected');
        switch(this.solveOption) {
            case "RCorta": {
               //statements;
               break;
            }
            case "MSTree": {
               this.pintar(this.MSTree(start));
               break;
            }
            case "RCritica":{
                //statements;
                break;
            }
            case "FlujoMax":{
                //statements;
                break;
            }
        }
    }

}
