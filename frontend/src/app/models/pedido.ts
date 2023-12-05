import { Calificacion } from "./calificacion";
import { Cliente } from "./cliente";
import { DetalleProducto } from "./detalle-producto";

export class Pedido {
    _id!:string;
    estado!: string;
    demora!: string;
    modalidad!: string;
    cliente!: Cliente;
    detalleProductos!: Array<DetalleProducto>;
    calificacion!: Calificacion;
    total!: number;
    formaDePago!: string;
}
