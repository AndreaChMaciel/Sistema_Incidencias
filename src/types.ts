// src/types.ts
export interface Usuarios {
    cn_id_usuario: number;
    ct_nombre: string;
    ct_cedula: string;
    ct_puesto: string;
    ct_celular: string;
    ct_correo: string;
    ct_contrasena: string;
    
}

export interface ApiResponse {
    usuarios: Usuarios[];
}

