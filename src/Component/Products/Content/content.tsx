import { Button, List, Radio, Switch,Row, Col } from 'antd'
import React, { useState } from 'react'
import ProductCardAll from './viewMethods/AllProduct.Card'
import AddProduct from './Add.product'
import ProductCardCategorywise from './viewMethods/CategorywiseProductCard'

const Content = () => {
 
  const [addvisible,setaddvisible]=useState<boolean>(false)
  const [ctgwise,setctgwise]=useState<boolean>(false)
  const onChange_radio=(e:any)=>{
    if(e.target.value == 2){
      setctgwise(true)
    }
    if(e.target.value == 1){
      setctgwise(false)
    }
    
  }
  return (
    <div> <h1>Products 
     </h1>
   <Row> <Col span={18}></Col><Col span={6}><div className="switch_product">  <Radio.Group
       onChange={onChange_radio} 
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
     {ctgwise ?<ProductCardCategorywise/> :<ProductCardAll/>}  
      </div>
     </div>
  )
}

export default Content