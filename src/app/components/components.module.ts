import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalFilmsComponent } from './modal-films/modal-films.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations:[
    ModalFilmsComponent,
  ],
  exports: [
    ModalFilmsComponent
  ]
})
export class ComponentsModule {}
