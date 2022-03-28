import { Form,Button ,notification} from 'antd'
import React, { useState } from 'react'
import Formitem from './Formitem'
import { password_char, type_email } from '../../utils/formvalidation'
import { openfillerror, opensignin } from '../../utils/notifications/loginnotifications'
import { usersignin } from '../../Interfaces/userInterface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Admin_user } from '../../features/userslice'
import { useAppDispatch } from '../../app/hook'

const initialUsersignup:usersignin={
  email:'',
  password:'',
}
const Signin = () => {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const [user,setuser]=useState(initialUsersignup)
  const {email,password}=user

  const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let {name,value}=e.target
    setuser({...user,[name]:value})
  }
  
  const handleSubmit=async()=>{
    if(email === '') {
      console.log('email his') 
      openfillerror('email required')
    return
  } 
  if(!type_email(email)){
    console.log('invalied email ') 
    openfillerror('invalied email')
    return
  }
    if(password === '') {
      console.log('password his') 
      openfillerror('password required')
      return
    }
    
    if(password_char(password)){ 
      console.log('8 char'); 
      openfillerror('password must have least 8 characters')
      return
    }
    try {
      const res=await axios.post('http://localhost:4020/userAdmin/signin',user,{ withCredentials: true }) 
      console.log(res);
      if(res.status == 200) {
        opensignin()
        dispatch(Admin_user())
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
 
   
  
    
   
  }
 
  return (

    <div><Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    autoComplete="off"
   
  >
      <Formitem onchange={onchange} type={email} label={'email'} />
      <Formitem onchange={onchange} type={password} label={'password'} />
 
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form.Item>
    
  </Form>
  
  </div>
  )
}

export default Signin