import { Rol } from "./rol";

export class Usuario {
    _id!: string;
    user!: string;
    password!: string;
    apellido!: string;
    nombre!: string;
    rol!: Rol;
    estado!: boolean;
}
