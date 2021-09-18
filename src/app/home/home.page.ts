import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalFilmsComponent } from '../components/modal-films/modal-films.component';
import { StarWars } from '../interfaces/StarWars';
import { LoadingController } from '@ionic/angular';
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

  public myImgs: Array<{id: number; url: string}> = [
    {id: 4, url: 'https://image.tmdb.org/t/p/w342/iSNdwFauC1QODm1ntk07wqJV1pf.jpg'},
    {id: 5, url: 'https://images-na.ssl-images-amazon.com/images/I/91zz3a+YJ-L.jpg'},
    {id: 6, url: 'https://images-na.ssl-images-amazon.com/images/I/81g8vEs4ixL.jpg'},
    {id: 1, url: 'https://http2.mlstatic.com/D_NQ_NP_762405-MLB25004598027_082016-O.jpg'},
    {id: 2, url: 'https://images-na.ssl-images-amazon.com/images/I/71Pepz8mOJL.jpg'},
    {id: 3, url: 'https://images-na.ssl-images-amazon.com/images/I/91enPvjLRlL.jpg'},
  ];

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    public loadingController: LoadingController
  ) {};

  public buscar(id?: number){
    return this.http.get(`${environment.uri}/${id || ''}`);
  }

  ngOnInit() {
    this.buscar().subscribe(
      (data) => {
        this.infos = data['results'].map((item: string[]) => ({
          ...item,
          showCard: false,
        }));
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

  getPersonagens(personagem: any){
    return new Promise((resolve, reject) => {
      this.http.get(personagem).subscribe((response) => {
        resolve(response);
      },
      error => {
        reject(error);
      }
      );
    });
  }

  async modalJedi(dadosAPI: any){
    // loading inicia aqui
    const loading = await this.loadingController.create({
      // spinner: null,
      message: 'Navegando entre as galáxias, click fora para abortar a missão',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
    //

    dadosAPI.personagens = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < dadosAPI.characters.length; i++){
      const p = await this.getPersonagens(dadosAPI.characters[i]);
      dadosAPI.personagens.push(p);
    }

    // loading termina aqui
    await loading.dismiss();
    //

    const modal = await this.modalController.create({
      component: ModalFilmsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        opening:dadosAPI
      }
    });
    return await modal.present();
  }

  opening(episodeId: number){
    const indexInfos = this.infos.findIndex(episodio => episodio.episode_id === episodeId);
    this.infos[indexInfos].showCard = !this.infos[indexInfos].showCard;
  }

}
