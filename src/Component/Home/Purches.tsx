import { Divider, Form ,Button} from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import Formitem from '../Login/Formitem'

const initial_purchase={
  discount:0,
  total:0
}

const Purches = () => {
  const dispatch=useAppDispatch()
  const sell=useAppSelector(state=> state.sell)
  const [purches,setpurches]=useState(initial_purchase)
  const {discount,total}=purches
    const handleSubmit=()=>{
      console.log(discount,total);
      
    }
    const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value}=e.target
      console.log(name,value);
      setpurches({...purches,[name]:value})
      // if(name == 'discount'){
      //   setpurches({...purches,total:calculated_total-discount})
      // }
     //
      }
      console.log(sell);
     
      let calculated_total=0
      sell.sell_product_list.map((sell)=>{ 
        calculated_total += sell.price * sell.quantity
        })
      console.log(calculated_total);
      useEffect(()=>{
        setpurches({...purches,total:calculated_total})
      },[calculated_total])
      useEffect(()=>{  
        setpurches({...purches,total:calculated_total-discount})
      },[discount])
      
  return (
    <div> <Form
    className='Purches_form'
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    autoComplete="off"
    size={'small'}
  ><Formitem onchange={onchange} type={calculated_total} label={'Calculated Price'} />
    <Formitem onchange={onchange} type={discount} label={'discount'} />
    <Formitem onchange={onchange} type={total} label={'total'} />
    <Divider className='sell_divider'/>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit"  onClick={handleSubmit}>
        Purches
      </Button>
    </Form.Item>
    </Form>
    </div>
  )
}

export default Purches