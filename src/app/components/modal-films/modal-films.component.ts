import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StarWars } from 'src/app/interfaces/StarWars';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-films',
  templateUrl: './modal-films.component.html',
  styleUrls: ['./modal-films.component.scss'],
})
export class ModalFilmsComponent implements OnInit {
  public infos: StarWars[];

  constructor(private http: HttpClient, public modal: ModalController) { }

  ngOnInit() {
    this.buscar().subscribe(
      (data) => {
        this.infos = data['results'];
      },
      (error) => {
        alert(`Algo falhou, tente novamente ${error}`);
      }
    );
  }

  public buscar(){
    return this.http.get(`${environment.uri}/`);
  }

  closeModal(){
    this.modal.dismiss();
  }
}
