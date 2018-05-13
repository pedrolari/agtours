export class ReservaTour {
  constructor(
    public _id:string,

    public tour:string,

    public fechaVenta:string,

    public fechainicio:string,
    public fechafin:string,
	
    public numAdultos:string,    
    public numInfantiles:string,

    public precio:string,
	public descuento:string,
    public preciototal:string,

    ) { }

}
