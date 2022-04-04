export interface sell_add_I{
    productId:string,
    quantity:number,
   
}

export interface sell_list_item_I extends sell_add_I{
  _id:string
  name:string,
  price:number,
  toatal:number
   
}
export interface sell_list_I {
 sell_product_list:sell_list_item_I[]
   
}