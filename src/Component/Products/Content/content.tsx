import { Button, List, Radio, Switch,Row, Col } from 'antd'
import React, { useState } from 'react'
import ProductCard from './Product.Card'
import AddProduct from './Add.product'

const Content = () => {
 
  const [addvisible,setaddvisible]=useState<boolean>(false)
  return (
    <div> <h1>Products 
     </h1>
   <Row> <Col span={18}></Col><Col span={6}><div className="switch_product">  <Radio.Group
      // onChange={onChange} 
      defaultValue={1}
      >
      <Radio value={1}>All</Radio>
      <Radio value={2}>Category wise</Radio>
      <Button type="primary" className="product_add_button" onClick={()=>{setaddvisible(true)}}
       block>
        Add Product
      </Button>
    </Radio.Group>
    {addvisible && <AddProduct addvisible={addvisible} setaddvisible={setaddvisible}/>}
       </div>
       </Col>
      
       </Row>
       <div className="productlist">
      <ProductCard/>
      </div>
     </div>
  )
}

export default Content