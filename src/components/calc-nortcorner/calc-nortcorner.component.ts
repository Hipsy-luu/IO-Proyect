import { Component, OnInit } from '@angular/core';
//Servicio para el componente 
//Les recomiendo poner todo lo referente a este metodo aqui
import { NortcornerComponentServiceService } from './../../app/services/nortcorner-component-service.service';

@Component({
  selector: 'app-calc-nortcorner',
  templateUrl: './calc-nortcorner.component.html',
  styleUrls: ['./calc-nortcorner.component.scss'],
})
export class CalcNortcornerComponent implements OnInit {

  //En el objeto nortCorner pongan lo referente para la vista y los metodos
  constructor(public nortCornerComponent : NortcornerComponentServiceService) { }

  ngOnInit() {}

}
