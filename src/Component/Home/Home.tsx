import { ToolOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import AddSell from './AddSell'
import img from './landing_00-720x379.jpg'
import Purches from './Purches'
import './style.css'
const Home = () => {
  return (
    <div className='dashboard'>
 <Row>
   <Col span={12}>
   <div className='Addsell'><AddSell /></div>
 </Col>
 <Col span={12}>
 <div className='Purches'><Purches /></div>
 </Col>
 </Row>
</div>
  )
}

export default Home