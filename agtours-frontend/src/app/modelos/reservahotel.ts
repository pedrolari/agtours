export class ReservaHotel {
  constructor(
    public _id:string,
    public hotel:string,
    public fechaventa:string,
    public fechaentrada:string,
    public fechasalida:string,
    public numhabitacionessimples:string,
    public numhabitacionesdobles:string,  
    public numAdultos:string,    
    public numInfantiles:string,
    public preciosimple:string,    
    public preciodoble:string,
    public precio:string,
	public descuento:string,
    public preciototal:string,

    ) { }

}