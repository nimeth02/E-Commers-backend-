import { ToolOutlined } from '@ant-design/icons'
import React from 'react'
import img from './landing_00-720x379.jpg'
import './style.css'
const Home = () => {
  return (
    <>
  <div className="container">  <ToolOutlined className='tool' style={{ fontSize: "30px" }}/><h1>Welcome to Admin Panel</h1>  </div>
<img className='home_img' src={img} alt={"Carlie Anglemire"}/>
</>
  )
}

export default Home