import { Button,  Checkbox, Divider, Input, Row, Slider } from 'antd';
import React from 'react'
const { Search } = Input;

const Sidebar = () => {
const color="red"
  return (
    
    
    <div className='sidebar_div_product'> <>
   
    <Search className='product_search' placeholder="Products" size='large' enterButton />
    <div className='filter_div_product'>
    
      <div className="checkbox_div_product_filter">
        <p>Price :</p>
      <Slider   range={{ draggableTrack: true }}    defaultValue={[0, 100]} />
        <Row>
        <Checkbox  className="checkbox_product_filter">In stock</Checkbox>
        </Row>
        <Row>
        <Checkbox className="checkbox_product_filter">Out of stock</Checkbox>
        </Row>

    
      </div>
      
    <Button type="primary" shape="round" size={'large'}>
          filter
        </Button>
    </div>
   
  </></div>
  )
}

export default Sidebar







