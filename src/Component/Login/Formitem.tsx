import React from "react";
import { Form, Input } from "antd";

interface form {
  type: string| number;
  label?:string
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const Formitem: React.FC<form> = ({ label,type, onchange }) => {
  return (
    <div>
      
        <Form.Item
          label={label}
          rules={[{ required: true, message: "Please input your Email !" }]}
        >{
          label == 'password' ||  label =='confirm_password' ?  
          <Input.Password
          onChange={onchange}
          name={label}
          value={type}
          placeholder={label}
        
        /> :
        <Input
        onChange={onchange}
        name={label}
        value={type}
        placeholder={label}
       
      />
        }
         
        </Form.Item>

     
    
    </div>
  );
};

export default Formitem;
