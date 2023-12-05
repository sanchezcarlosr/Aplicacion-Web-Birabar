import { Categoria } from "./categoria";
export class Producto {
    _id!:string;
    nombreProducto!: string;
    descripcion!: string; 
    imagen!: string;
    precio!: number;
    estado!: boolean;
    categoria!: Categoria;
    disponible!:Boolean;
}
