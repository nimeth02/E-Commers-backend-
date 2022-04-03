import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Col, Row ,Modal} from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../app/hook'
import { product_delete } from '../../../features/productslice'
import { product_add_Interface } from '../../../Interfaces/productInterface'

interface product_delete{
    product:product_add_Interface
    visible_delete:boolean
    setvisible_delete: React.Dispatch<React.SetStateAction<boolean>>;

}

const DeleteProduct= ({product,visible_delete,setvisible_delete}:product_delete) => {
  const dispatch=useAppDispatch()
  const handlesubmit=()=>{
    dispatch(product_delete(product._id))
    setvisible_delete(false)
  }
  return (
    <div><Modal title={<h2>Delete   Category</h2>} visible={true} 
     onOk={handlesubmit} 
   onCancel={()=>{setvisible_delete(false)}}
   width={600}
   >


<Alert
       
       message={<Row><Col span={2} ><h2><InfoCircleOutlined /></h2></Col><Col><h3>Name: {product.name} </h3></Col></Row>}
       type="error"
      
     />
 
 </Modal></div>
  )
}

export default DeleteProduct