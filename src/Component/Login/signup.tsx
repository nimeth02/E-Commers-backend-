import { Form,Button ,notification, Result} from 'antd'
import React, { useState } from 'react'
import Formitem from './Formitem'
import { match_password, password_char, type_email, mobile_char } from '../../utils/formvalidation'
import axios from 'axios'
import { usersignup } from '../../Interfaces/userInterface'
import { opensignup,openfillerror } from '../../utils/notifications/loginnotifications'

const initialUsersignup:usersignup={
  name:'',
  mobilenumber:'',
  email:'',
  password:'',
  confirm_password:''
}
interface p{
  setlogin: React.Dispatch<React.SetStateAction<boolean>>
}
const Signup = (props:p) => {
  const [user,setuser]=useState(initialUsersignup)
  const {name,mobilenumber,email,password,confirm_password}=user

  const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let {name,value}=e.target
    setuser({...user,[name]:value})
  }
  const handleSubmit=async()=>{
    console.log(user);
  if(email === '' || password === '' || confirm_password === '' || name === '' || mobilenumber === '') {
    console.log('email his') 
    openfillerror('fill required fields')
    return
  } 
  if(!type_email(email)){
    console.log('invalied email ') 
    openfillerror('invalied email')
    return
  }
  if(mobile_char(mobilenumber)){ 
    console.log('10 mobile char'); 
    openfillerror('invalied mobile number')
    return
      }   
  if(password_char(password)){ 
    console.log('8 char password'); 
    openfillerror('password must have least 8 characters')
    return
    }
  if(!match_password(password,confirm_password)){ 
    console.log('match password'); 
    openfillerror('confirm password does not match')
    return
    }
  try {
    const res=await axios.post('http://localhost:4020/userAdmin/signup',user)
    console.log(res);
    if(res.status == 201){
      opensignup(email)
      props.setlogin(true)
    }else{
      //openfillerror(res.message)
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

     <Formitem onchange={onchange} type={name} label={'name'} />
     <Formitem onchange={onchange} type={email} label={'email'} />
     <Formitem onchange={onchange} type={mobilenumber} label={'mobilenumber'} />
     <Formitem onchange={onchange} type={password} label={'password'} />
     <Formitem onchange={onchange} type={confirm_password} label={'confirm_password'} />
    
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit"  onClick={handleSubmit}>
        Submit
      </Button>
    </Form.Item>
  </Form>
 
  </div>
  
  )
}

export default Signup