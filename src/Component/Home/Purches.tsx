import { Divider, Form ,Button} from 'antd'
import React from 'react'
import Formitem from '../Login/Formitem'

const Purches = () => {
    const handleSubmit=()=>{

    }
    const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       
      }
  return (
    <div> <Form
    className='Purches_form'
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    autoComplete="off"
    size={'small'}
  ><Formitem onchange={onchange} type={''} label={'Calculated Price'} />
    <Formitem onchange={onchange} type={''} label={'Discount'} />
    <Formitem onchange={onchange} type={''} label={'Total Price'} />
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