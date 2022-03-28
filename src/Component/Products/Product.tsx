import React, { useEffect } from 'react'
import Sidebar from './sidebar'
import './style.css'
import { Col, Row } from 'antd'
import Content from './Content/content'
import { useAppDispatch } from '../../app/hook'
import { product_get } from '../../features/productslice'


const Product = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {  
   console.log('product useEffect');
   
      dispatch(product_get());
     
   
   
  }, []);

  return (
    <div><Row className=''>
    <Col span={5} className='product_col_side'>
    <Sidebar />
    </Col>
    <Col span={19} className='product_col'>
      <Content />
    </Col>
    </Row></div>
  )
}

export default Product