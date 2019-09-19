import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalController: ModalController) {}

  methods = [
    {
        name: "Ramificación y Acotamiento",
        img: "../assets/imgs/aco.jpg",
        url: "/branch-bound",
    },
    {
        name: "Método Simplex",
        img: "../assets/imgs/simplex.jpg",
        url: "/simplex"
    },
    {
        name: "Método Hungaro",
        img: "../assets/imgs/hungaro.jpg",
        url: "/hungaro"
    },
    {
        name: "Esquina Noroeste",
        img: "../assets/imgs/esquina_noroeste.png",
        url:"/north-corner",
    },
    {
        name: "Métodos Gráficos",
        img: "../assets/imgs/aem.jpg",
        url: "/draw-graph",
    }
  ];

  ngOnInit() {
  }
}
