import { Usuario } from "./usuario";

export class Cliente {
    _id!: string;
    direccion!: string;
    email!: string;
    telefono!: string;
    usuario!: Usuario;
    suscripto!:boolean;
}
