export interface productInterface{
name:string
quantity:number
description:string
price:number
select:string

}
export interface product_add_Interface{
    _id:string
    name:string
    quantity:number
    description:string
    price:number
  select?:string
    categorytId:{
        _id:string
        name:string
    }
    productImage:[{
        _id:string
        img:string
    }]
    }
    export interface product_initial{
       products:product_add_Interface[]
        }   

export interface add_product{
    initialproducts:productInterface,
    productimages:any[]
}

export interface product_update{
    name:string
    quantity:number
    description:string
    price:number
    productImage:[{
        _id:string
        img:string
    }]  
    }