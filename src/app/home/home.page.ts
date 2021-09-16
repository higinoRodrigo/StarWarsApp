import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalFilmsComponent } from '../components/modal-films/modal-films.component';
import { StarWars } from '../interfaces/StarWars';

interface MyImgs {
  url: string;
  id: number;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public infos: StarWars[];
  openingClick = false;

  // eslint-disable-next-line @typescript-eslint/ban-types
  public myImgs: Array<any> = [
    // eslint-disable-next-line max-len
    {id: 4, url: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/af58cf4613f9e35d7701715030888ae8ee202fe82c7690903220ff440abb1dc2._RI_V_TTW_.jpg'},
    {id: 5, url: 'https://images-na.ssl-images-amazon.com/images/I/91zz3a+YJ-L.jpg'},
    {id: 6, url: 'https://images-na.ssl-images-amazon.com/images/I/81g8vEs4ixL.jpg'},
    {id: 1, url: 'https://http2.mlstatic.com/D_NQ_NP_762405-MLB25004598027_082016-O.jpg'},
    {id: 2, url: 'https://images-na.ssl-images-amazon.com/images/I/71Pepz8mOJL.jpg'},
    {id: 3, url: 'https://images-na.ssl-images-amazon.com/images/I/91enPvjLRlL.jpg'},
  ];

  constructor(private http: HttpClient, private modalController: ModalController) {};

  public buscar(){
    return this.http.get(`${environment.uri}/`);
  }

  ngOnInit() {
    this.buscar().subscribe(
      (data) => {
        this.infos = data['results'];
      },
      (error) => {
        alert(`Algo falhou, tente novamente ${error}`);
      }
    );
  };

  imgsFunction(id: number){
    const img = this.myImgs.find(imagem => imagem.id === id);
    return img;
  }

  async modalJedi(){
    const modal = await this.modalController.create({
      component: ModalFilmsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  opening(episodeId: number){
    console.log(episodeId);

    if(!this.openingClick){
      this.openingClick = true;
    } else {
      this.openingClick = false;
    }
  }

}
