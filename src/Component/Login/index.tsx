import { Card } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
import "./style.css";
const Login = () => {
  const [login_method, setlogin_method] = useState(true);
  const handle_new_admin = () => {setlogin_method(false) };
  const handle_already_ac = () => {setlogin_method(true) };
  return (
    <div className="login_form">
     
      {login_method ? (
        <Card className="login_card">
         <h1>Login</h1> 
          <Signin />
          <div className="login_card_div">
            <p>New Admin ?</p>
            <h3 onClick={handle_new_admin}> Signup</h3>
          </div>
        </Card>
      ) : (
        <Card className="login_card">
          <h1>Login</h1> 
          <Signup 
           setlogin={setlogin_method}
          />
          <div className="login_card_div">
            <p>Already have a account ?</p>
            <h3 onClick={handle_already_ac}> Signin</h3>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Login;
