import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import  axios  from 'axios'
import type { RootState } from '../app/store'
import { updateprofile } from '../Interfaces/userInterface'



const initialState={
   

}
  
// export const product_get = createAsyncThunk('product_get', async () => {
//     console.log('products')
//       const res=await axios.get('http://localhost:4020/product/get',{ withCredentials: true })
//      // console.log(res.data.data);
//       return res.data.data
   
    
//   })
  export const sell_adding = createAsyncThunk('sell_adding', async () => {
    console.log('sell_adding')
      const res=await axios.post('http://localhost:4020/product/create',{ withCredentials: true })
      console.log(res.data)  
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
     
    })
    builder.addCase(sell_adding.rejected,(state,action)=>{
    })
 
  }
})


export default sellSlice.reducer