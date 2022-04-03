export interface sell_add_I{
    productId:string,
    quantity:number,
   
}
export interface sell_list_I extends sell_add_I{
  name:string,
  price:number,
  toatal:number
   
}