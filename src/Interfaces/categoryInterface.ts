export interface Category {
    _id:string
   name:string
   parentId:string
   children:Category[]

  }
 export interface Categories{
    categories:Category[]
    isupdated:boolean
  }
  export interface add_interface{
    name:string
    parentId:string
    
  }
  export interface update_interface{
    name:string
    parentId:string
    _id:string
  }
  export interface delete_interface{
    _id:string
  }
  export interface check_content_interface{
    name:string
    parentId:string
    checkedlist:string
  }
  
