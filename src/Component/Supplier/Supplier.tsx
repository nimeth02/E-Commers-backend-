import { Col, Row } from 'antd'
import React from 'react'
import Content from './content/content'
import Sidebar from './sidebar'

const Supplier = () => {
  return  (
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

export default Supplier