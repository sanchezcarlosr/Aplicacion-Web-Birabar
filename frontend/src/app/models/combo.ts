import { Producto } from "./producto";

export class Combo {
    _id!:string; 
    titulo!:string; 
    descuento!:number;
    montoFinal!:number; 
    montoLista!:number;
    productos!:Array<string>;
    estado!:boolean;
    imagen!:string; 

    constructor()
    {
        this.productos = new Array<string>();
    }

}
