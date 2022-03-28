import { createAsyncThunk, createSlice
    // , PayloadAction 
  } from '@reduxjs/toolkit'
  import  axios  from 'axios'
  
  import { Categories, Category, add_interface, update_interface, delete_interface } from '../Interfaces/categoryInterface'
import { add_product, productInterface, product_add_Interface, product_initial } from '../Interfaces/productInterface'
  
  
  
  
  // const initialState:product_add_Interface=[{
  //   _id:'',
  //   name:'',
  //   quantity:0,
  //   description:'',
  //   price:0,
  //   select:'',
  //   productimage:[{
  //     _id:'',
  //     img:''
  // }]
  // }]
 const initialState:product_initial={
  products:[]
 }

  
  export const product_get = createAsyncThunk('product_get', async () => {
    console.log('products')
      const res=await axios.get('http://localhost:4020/product/get',{ withCredentials: true })
     // console.log(res.data.data);
      return res.data.data
   
    
  })
  export const product_add = createAsyncThunk('product_add', async (form:any) => {
    console.log('product_add',form)
      const res=await axios.post('http://localhost:4020/product/create',form,{ withCredentials: true })
    console.log(res);
    
      console.log('add data',res.data)   
          
  })
  export const products_update = createAsyncThunk('products_update', async ({form,_id}:{form:any,_id:string}) => {
    console.log('products_update',form)
      const res=await axios.put(`http://localhost:4020/product/update/${_id}`,form,{ withCredentials: true })
    
      console.log(res.data)   
          
  })
//   export const categories_delete = createAsyncThunk('categories_delete', async ({_id}:delete_interface) => {
//     console.log('categories_update')
//       const res=await axios.delete(`http://localhost:4020/category/delete/${_id}`,{ withCredentials: true })
//       if(res.status == 201){
//         addcategory_succ()
//       }
//       else{
//         addcategory_err()
//       }
//       console.log(res.data)   
          
//   })
  
  
  
  
  export const productSlice = createSlice({
    name: 'product',
   
    initialState,
    reducers: {
  
    },
    extraReducers:(builder)=>{
      builder.addCase(product_add.pending,(state,action)=>{
        
      })
      builder.addCase(product_add.fulfilled,(state,action)=>{
        // state=action.payload
    
      
      })
      builder.addCase(product_add.rejected,(state,action)=>{
       
      })
      builder.addCase(product_get.pending,(state,action)=>{
        
      })
      builder.addCase(product_get.fulfilled,(state,action)=>{
        state.products=action.payload
      
      })
      builder.addCase(product_get.rejected,(state,action)=>{
       
       })
    //   builder.addCase(categories_update.pending,(state,action)=>{
        
    //   })
    //   builder.addCase(categories_update.fulfilled,(state,action)=>{
    //     state.isupdated=false
      
    //   })
    //   builder.addCase(categories_update.rejected,(state,action)=>{
       
    //   })
    //   builder.addCase(categories_delete.pending,(state,action)=>{
        
    //   })
    //   builder.addCase(categories_delete.fulfilled,(state,action)=>{
    //     state.isupdated=false
      
    //   })
    //   builder.addCase(categories_delete.rejected,(state,action)=>{
       
    //   })
    }
  })
  
  
  export default productSlice.reducer