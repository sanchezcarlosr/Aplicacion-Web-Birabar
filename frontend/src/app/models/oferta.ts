import { Producto } from "./producto";

export class Oferta {
    _id!:string;
    titulo!:string;
    descripcion!:string;
    estado: boolean = true;
    dias!:Array<string>;
    desde!:string;
    hasta!:string;
    imagen!: string;
    precio!: number;
    productos!:Array<string>;
}
