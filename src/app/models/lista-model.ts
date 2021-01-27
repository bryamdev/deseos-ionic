import { ListaItem } from "./lista-item.model";

export class Lista{

    public id: number;
    public titulo: string;
    public creadaEn: Date;
    public terminadaEn: Date;
    public terminada: boolean;
    public items: ListaItem[];

    constructor( titulo: string){
        
        this.titulo = titulo;

        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];

        this.id = new Date().getTime();

    }
}