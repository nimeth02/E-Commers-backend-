import { Form, Input,Button,Checkbox } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/hook';
import { userprofile } from '../../Interfaces/userInterface'

const Settings = () => {
    const user = useAppSelector((state) => state.user);
    const [name,setname]=useState<string>('pp')
    const initialUserprofile:userprofile={
        name:user.user.name,
        mobilenumber:user.user.mobilenumber,
        password:'',
        confirm_password:''
      }
    //   setname(user.user.name)
      console.log(user.user.name,name,'kkk');
      
  return (
    <div>Settings
         <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input value={name}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    </div>
  )
}

export default Settings