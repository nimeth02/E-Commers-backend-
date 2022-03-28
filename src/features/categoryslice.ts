import { createAsyncThunk, createSlice
  // , PayloadAction 
} from '@reduxjs/toolkit'
import  axios  from 'axios'
// import { useAppDispatch } from '../app/hook'
// import type { RootState } from '../app/store'
import { Categories, Category, add_interface, update_interface, delete_interface } from '../Interfaces/categoryInterface'

import {  addcategory_err, addcategory_succ } from '../utils/notifications/category'


const initialState:Categories={
    categories:[],
    isupdated:false
    

}

export const categories_get = createAsyncThunk('categories', async () => {
  //console.log('categories')
    const res=await axios.get('http://localhost:4020/category/get',{ withCredentials: true })
    console.log(res.data);
    return res.data.data
 
  
})
export const categories_add = createAsyncThunk('categories_add', async ({name,parentId}:add_interface) => {
  console.log('categories_add',name,parentId)
    const res=await axios.post('http://localhost:4020/category/create',{name,parentId},{ withCredentials: true })
    if(res.status == 201){
      addcategory_succ()
    }
    else{
      addcategory_err()
    }
    console.log('add data',res.data)   
        
})
export const categories_update = createAsyncThunk('categories_update', async ({name,parentId,_id}:update_interface) => {
  console.log('categories_update',name,parentId)
    const res=await axios.put(`http://localhost:4020/category/update/${_id}`,{name,parentId},{ withCredentials: true })
    if(res.status == 201){
      addcategory_succ()
    }
    else{
      addcategory_err()
    }
    console.log(res.data)   
        
})
export const categories_delete = createAsyncThunk('categories_delete', async ({_id}:delete_interface) => {
  console.log('categories_update')
    const res=await axios.delete(`http://localhost:4020/category/delete/${_id}`,{ withCredentials: true })
    if(res.status == 201){
      addcategory_succ()
    }
    else{
      addcategory_err()
    }
    console.log(res.data)   
        
})




export const categorySlice = createSlice({
  name: 'category',
 
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder.addCase(categories_get.pending,(state,action)=>{
      
    })
    builder.addCase(categories_get.fulfilled,(state,action)=>{
      state.categories=action.payload
      state.isupdated=true
    
    })
    builder.addCase(categories_get.rejected,(state,action)=>{
     
    })
    builder.addCase(categories_add.pending,(state,action)=>{
      
    })
    builder.addCase(categories_add.fulfilled,(state,action)=>{
      state.isupdated=false
    
    })
    builder.addCase(categories_add.rejected,(state,action)=>{
     
    })
    builder.addCase(categories_update.pending,(state,action)=>{
      
    })
    builder.addCase(categories_update.fulfilled,(state,action)=>{
      state.isupdated=false
    
    })
    builder.addCase(categories_update.rejected,(state,action)=>{
     
    })
    builder.addCase(categories_delete.pending,(state,action)=>{
      
    })
    builder.addCase(categories_delete.fulfilled,(state,action)=>{
      state.isupdated=false
    
    })
    builder.addCase(categories_delete.rejected,(state,action)=>{
     
    })
  }
})


export default categorySlice.reducer