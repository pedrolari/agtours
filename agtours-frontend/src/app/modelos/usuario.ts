export class Usuario {
  constructor(
    public _id:string,
    public nombre:string,
    public apellidos:string,
    public direccion:string,
    public cp:string,
    public telefono:string,
    public email:string,
    public password:string
    // public rol:string,
    // public idciudad:string,
    ) { }

}
