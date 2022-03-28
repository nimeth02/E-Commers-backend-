import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import  axios  from 'axios'
import type { RootState } from '../app/store'
import { updateprofile } from '../Interfaces/userInterface'


interface UserState {
 name:string
 email:string
 mobilenumber:string
 _id:string
 role:string
}
interface user{
  user:UserState
  Authed_admin:boolean
}
const initialState={
  user:{
    name:'',
    email:'',
    mobilenumber:'',
    _id:'',
    role:''
},
Authed_admin:false
}

export const Admin_user = createAsyncThunk('Admin_user', async () => {
  console.log('getAdmin')
    const res=await axios.get('http://localhost:4020/userAdmin/',{ withCredentials: true })
    console.log(res.data);
    return res.data.data
 
  
})
export const Admin_user_update = createAsyncThunk('Admin_user_update', async ({name,mobilenumber,password}:updateprofile) => {
  console.log('getAdmin update',name,mobilenumber,password)
    const res=await axios.put('http://localhost:4020/userAdmin/update',{name,mobilenumber,password},{ withCredentials: true })
    console.log(res.data);
    return res.data.data
 
  
})
export const Admin_user_logout = createAsyncThunk('Admin_user_logout', async () => {
  console.log('getAdmin logout')
    const res=await axios.get('http://localhost:4020/userAdmin/logout',{ withCredentials: true })
    console.log(res.data);
    return res.data.data
 
  
})

export const userSlice = createSlice({
  name: 'user',
 
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder.addCase(Admin_user.pending,(state,action)=>{
      
    })
    builder.addCase(Admin_user.fulfilled,(state,action)=>{
      state.user=action.payload
      state.Authed_admin=true
    })
    builder.addCase(Admin_user.rejected,(state,action)=>{
      state.Authed_admin=false
    })
    builder.addCase(Admin_user_update.pending,(state,action)=>{
      
    })
    builder.addCase(Admin_user_update.fulfilled,(state,action)=>{
      state.user=action.payload
    
    })
    builder.addCase(Admin_user_logout.rejected,(state,action)=>{
     
    })
    builder.addCase(Admin_user_logout.pending,(state,action)=>{
      
    })
    builder.addCase(Admin_user_logout.fulfilled,(state,action)=>{
      state.Authed_admin=false
    
    })
    builder.addCase(Admin_user_update.rejected,(state,action)=>{
     
    })
  }
})


export default userSlice.reducer