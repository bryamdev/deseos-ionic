import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista-model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  public listas: Lista[];

  constructor( private deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {

    this.listas = deseosService.listas;
  }
  
  async agregarLista(){

    //await indica que espere que se ejecute el create y luego guarde el resultado en alert
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: ()=>{
            console.log("cancelar");
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{  

            if(data.titulo.length == 0){
              console.log("No ingresó el titulo");
              return;
            }

            let idListaCreada = this.deseosService.agregarLista(data.titulo);
            console.log("Id lista creada: " + idListaCreada);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${idListaCreada}`);
                      
          }
        }
      ]
    });

    alert.present();    
  }
  

}
