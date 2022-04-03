import { Form, Button, Divider, List } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import {   sell_add_I, sell_list_I  } from "../../Interfaces/sellInterface";
import Formitem from "../Login/Formitem";
import { sell_adding } from "../../features/sellslice";

const  initial_sell_add:sell_add_I={
  productId:'',
  quantity:0
}
const initial_sell_list:sell_list_I={
  productId:'',
  quantity:0,
  name:'',
  price:0,
  toatal:0
}

const AddSell = () => {
  const dispatch=useAppDispatch()
  const [sell_add,setsell_add]=useState(initial_sell_add)
  const [sell_list,setsell_list]=useState(initial_sell_list)
  const {productId,quantity}=sell_add
  const handleSubmit = () => {
    dispatch(sell_adding())
    
  };
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
          <Divider orientation={"left"} className="sell_divider" />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="selldiv">
        <List itemLayout="horizontal" >
          {" "}
          <List.Item className="sell_list_item" style={{borderBottom:'2px solid rgb(15, 55, 173)'}}>
            <List.Item.Meta
              title={
                <div className="sell_list_title">
                  <div className="sell_list_prodct_name">Samsung A2</div>
                  <div className="sell_list_total_price">35000</div>
                </div>
              }
              description={<div className="sell_list_description">
                <div className="sell_list_productId">#12</div>
                <div className="sell_product_quantity">4 * 3500</div>
                </div>
              }
            />
          </List.Item>
         
          
        </List>
      </div>
    </>
  );
};

export default AddSell;
