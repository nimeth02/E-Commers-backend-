import { Form, Button, Divider, List, InputNumber } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {   sell_add_I, sell_list_I  } from "../../Interfaces/sellInterface";
import Formitem from "../Login/Formitem";
import { sell_adding } from "../../features/sellslice";

const  initial_sell_add:sell_add_I={
  productId:'',
  quantity:1
}
// const initial_sell_list:sell_list_I={
//   _id:'',
//   productId:'',
//   quantity:0,
//   name:'',
//   price:0,
//   toatal:0
// }
const initial_sell_list:sell_list_I={
  sell_product_list:[]
}

const AddSell = () => {
  const dispatch=useAppDispatch()
  const sell=useAppSelector(state=> state.sell)
  const [sell_add,setsell_add]=useState(initial_sell_add)
  const [sell_list,setsell_list]=useState(initial_sell_list)
  const {productId,quantity}=sell_add
  const handleSubmit = () => {
    console.log(productId,quantity);
    
    dispatch(sell_adding({productId,quantity}))
    setsell_add(initial_sell_add)
  };
  console.log('sell',sell);
  
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=e.target
    console.log(name,value);
    setsell_add({...sell_add,[name]:value})
  };
  
  return (
    <>
      {" "}
      <div className="Addsell_form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          size={"small"}
        >
          <Formitem onchange={onchange} type={productId} label={"productId"} />
          {/* <Formitem onchange={onchange} type={""} label={"Price"} /> */}
          <Formitem onchange={onchange} type={quantity} label={"quantity"} />
          {/* <InputNumber
                  // name="price"
                  onChange={(value) => {
                    setsell_add({ ...sell_add, quantity: value });
                  }}
                  value={quantity}
                  addonBefore="Rs"
                /> */}
          <Divider orientation={"left"} className="sell_divider" />
          <div className="btn-sell" style={{display:'flex',justifyContent:'space-around'}}>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Add
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Bill
            </Button>
          </Form.Item>
          </div>
        </Form>
      </div>
      <div className="selldiv">
        <List itemLayout="horizontal" >
          {sell.sell_product_list.map((sell,i)=>{
            return <List.Item key={sell._id + i} className="sell_list_item" style={{borderBottom:'2px solid rgb(15, 55, 173)'}}>
             <List.Item.Meta
               title={
                 <div className="sell_list_title">
                   <div className="sell_list_prodct_name">{sell.name}</div>
                   <div className="sell_list_total_price">{sell.quantity * sell.price}</div>
                 </div>
               }
               description={<div className="sell_list_description">
                 <div className="sell_list_productId">{sell.productId}</div>
                 <div className="sell_product_quantity">{sell.quantity} * {sell.price}</div>
                 </div>
               }
             />
           </List.Item>
          })}
         
         
          
        </List>
      </div>
    </>
  );
};

export default AddSell;
