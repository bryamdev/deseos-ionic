import { Injectable } from '@angular/core';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista-model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public listas: Lista[] = [];

  constructor() { 

    this.cargarStorage();  

  }

  agregarLista( titulo: string ){

    let listaNew = new Lista(titulo);
    this.listas.push( listaNew );
    this.guardarStorage();

    return listaNew.id;
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage(){

    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
    
  }

  obtenerListaPorId(id: number): Lista{

    return this.listas.find( item =>{      
      if(item.id == id){
        return item;
      }
    });

  }

  borrarLista(lista: Lista){

    this.listas = this.listas.filter( listaData => {
      return listaData.id !== lista.id;
    })

    this.guardarStorage();

  }

  cambiarNombreLista(lista: Lista, titulo: string){

    this.listas.map( listaData => {
      if(listaData.id === lista.id){
        return listaData.titulo = titulo;
      }
      return listaData;
    });

    this.guardarStorage();

  }

}
