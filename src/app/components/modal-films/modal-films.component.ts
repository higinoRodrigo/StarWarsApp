import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StarWars } from 'src/app/interfaces/StarWars';
@Component({
  selector: 'app-modal-films',
  templateUrl: './modal-films.component.html',
  styleUrls: ['./modal-films.component.scss'],
})
export class ModalFilmsComponent implements OnInit {
  @Input() opening: StarWars;

  constructor(public modal: ModalController) { }

  ngOnInit() {
    // console.log(this.opening);
  }

  closeModal(){
    this.modal.dismiss();
  }
}
