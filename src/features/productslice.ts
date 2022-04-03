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
      console.log(res.data)  
      return res.data.data 
          
  })
  export const products_update = createAsyncThunk('products_update', async ({form,_id}:{form:any,_id:string}) => {
    console.log('products_update',form)
      const res=await axios.put(`http://localhost:4020/product/update/${_id}`,form,{ withCredentials: true })
    
      console.log(res.data)
      return res.data.data  
  })
  export const product_delete = createAsyncThunk('product_delete', async (_id:string) => {
    console.log('product_delete')
      const res=await axios.delete(`http://localhost:4020/product/delete/${_id}`,{ withCredentials: true })
      console.log(res.data)   
          return res.data.data._id
  })
  
  
  
  
  export const productSlice = createSlice({
    name: 'product',
   
    initialState,
    reducers: {
  
    },
    extraReducers:(builder)=>{
      builder.addCase(product_add.pending,(state,action)=>{
        
      })
      builder.addCase(product_add.fulfilled,(state,action)=>{
         state.products.push(action.payload)
    
      
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
      builder.addCase(products_update.pending,(state,action)=>{
        
      })
      builder.addCase(products_update.fulfilled,(state,action)=>{
        state.products=state.products.map((product)=>{if(product._id == action.payload._id){
          console.log('if',action.payload,product);
          //state.products.push(action.payload)
          return action.payload
        }
      else{
        console.log('else');
        return product
      }})
      
      console.log(state.products);
      
      })
      builder.addCase(products_update.rejected,(state,action)=>{
       
      })
      builder.addCase(product_delete.pending,(state,action)=>{
        
      })
      builder.addCase(product_delete.fulfilled,(state,action)=>{
        state.products=state.products.filter((product)=>{if(product._id != action.payload){
          return product
        }})
      })
      builder.addCase(product_delete.rejected,(state,action)=>{
       
      })
    }
  })
  
  
  export default productSlice.reducer