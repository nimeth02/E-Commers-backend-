/* eslint-disable eqeqeq */
import { Menu } from "antd";
import React, { useState } from "react";
import "./style.css";
import {  ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import Profile from "./profile";

// interface item{
//   title:string
//   content:React.ReactNode
// }
function Navbar() {
  const [visible,setvisible]=useState(false)
  const user=useAppSelector(state=>state.user)
  const handleprofile=()=>{
    console.log('profile');
    setvisible(true)
    
  }
 
  return (
    <>
      <Menu
        className="nav_menu"
        style={{ width: "100%", paddingRight: "15px" }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
      
        mode={"horizontal"}
        
      >       
      <Menu.Item key="1" className="nav_item_home" >
        <Link to={'/'} className='nav_link'>
          <ShopOutlined className="nav_icon" style={{ fontSize: "20px" }} />{" "}
          Zeeg
          </Link>
        </Menu.Item>   
        
        <Menu.Item key="2" className="nav_item">
        <Link to={'/category'} className='nav_link'>
          Category
          </Link>
        </Menu.Item>       
      
        <Menu.Item key="3" className="nav_item">
        <Link to={'/product'} className='nav_link'>
          Product
          </Link>
        </Menu.Item>
              
        <Menu.Item key="4" className="nav_item" >
        <Link to={'/supplier'} className='nav_link' >
          Supplier
          </Link>
        </Menu.Item>
           
        <Menu.Item
          key="5"
          className="nav_item_profile"
          style={{ marginLeft: "auto"}}
        >
          {
            user.Authed_admin != true ?   <Link to={'/login'} className='nav_link'>
            <UserOutlined className="nav_icon" style={{ fontSize: "17px" }}/>
            Signin
            </Link>:<>
           
          <div className='nav_link'  onClick={handleprofile}> <UserOutlined className="nav_icon" style={{ fontSize: "17px" }}/>
          { user.user.name}</div>
           </>
          }           
        </Menu.Item>  
      </Menu>
    
  <Profile visible={visible} setvisible={setvisible}/>
    </>
  );
}

export default Navbar;
