import { Producto } from "./producto";

export class DetalleProducto {
    _id!:string;
    cantidad!: number;
    producto!: Producto;
    subtotal!: number;
}
