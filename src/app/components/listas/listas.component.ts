import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista-model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  //Busca elementos del HTML para manipularlos desde aqui (en esta caso el elemento 'ion-list')
  @ViewChild( IonList ) ionList: IonList;
  @Input() terminada: boolean = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) { 
  }

  ngOnInit() {}

  seleccionarLista( lista: Lista){

    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista( lista: Lista ){
    
    this.deseosService.borrarLista(lista);

  }

  async editarNombreLista( lista: Lista ){

    const alert = await this.alertCtrl.create({
      header: 'Editar nombre de la lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: ()=>{
            console.log("cancelar");
            this.ionList.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if(data.titulo.length == 0){
              console.log("No ingresó el titulo");
              return;
            }

            this.deseosService.cambiarNombreLista(lista, data.titulo);
            this.ionList.closeSlidingItems();

            /*
            //Forma mas directa
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            */
          }
        }
      ]
    });

    alert.present();
  }


}
