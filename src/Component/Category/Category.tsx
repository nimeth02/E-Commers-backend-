import { Col, Row } from 'antd'

import React from 'react'
import Content from './Content/content'
import Sidebar from './sidebar'
import './style.css'


const Category = () => {
  console.log('category main component');
  
  return (
    <div><Row className='category_row'>
      <Col span={5} className='category_col_side'>
        <Sidebar />
      </Col>
      <Col span={19} className='category_col'>
        <Content />
      </Col>
      </Row>  </div>
  )
}

export default Category