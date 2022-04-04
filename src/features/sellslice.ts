import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import  axios  from 'axios'
import type { RootState } from '../app/store'
import { sell_add_I, sell_list_I } from '../Interfaces/sellInterface'
import { updateprofile } from '../Interfaces/userInterface'



const initialState:sell_list_I={
   sell_product_list:[]

}
  
// export const product_get = createAsyncThunk('product_get', async () => {
//     console.log('products')
//       const res=await axios.get('http://localhost:4020/product/get',{ withCredentials: true })
//      // console.log(res.data.data);
//       return res.data.data
   
    
//   })
  export const sell_adding = createAsyncThunk('sell_adding', async ({productId,quantity}:sell_add_I) => {
    console.log('sell_adding',productId,quantity)
      const res=await axios.post('http://localhost:4020/product/getone',{productId},{ withCredentials: true })
      console.log(res.data.data) 
      res.data.data.quantity=quantity 
      return res.data.data 
          
  })


export const sellSlice = createSlice({
  name: 'sell',
 
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder.addCase(sell_adding.pending,(state,action)=>{
      
    })
    builder.addCase(sell_adding.fulfilled,(state,action)=>{
      state.sell_product_list.push(action.payload)
    })
    builder.addCase(sell_adding.rejected,(state,action)=>{
    })
 
  }
})


export default sellSlice.reducer