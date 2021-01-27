import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista-model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  private lista: Lista;
  private nombreItem: string; 

  constructor( private activeRout: ActivatedRoute,
               private deseosService: DeseosService ) { 

    let idLista = this.activeRout.snapshot.params['id'];
    // console.log(`El id es>>>: ${idLista}`);

    this.lista = this.deseosService.obtenerListaPorId(idLista);
    //console.log(this.lista);

  }
  
  agregarItem(){
    
    if(this.nombreItem.length === 0){
      return;
    }
    this.lista.items.push(new ListaItem(this.nombreItem));
    this.deseosService.guardarStorage();
    this.nombreItem = '';
  }

  cambioCheck( item: ListaItem ){

    let pendientes = this.lista.items.filter(item => {
      return !item.completado
    }).length;

    console.log({pendientes});

    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();

    console.log(this.deseosService.listas);

  }

  borrarItem(id: number){

    this.lista.items.splice(id, 1);
    this.deseosService.guardarStorage();

  }
  

}
