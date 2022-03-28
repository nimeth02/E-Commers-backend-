import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Col, Row ,Modal} from 'antd'
import React from 'react'
import { product_add_Interface } from '../../../Interfaces/productInterface'

interface product_delete{
    product:product_add_Interface
    visible_delete:boolean
    setvisible_delete: React.Dispatch<React.SetStateAction<boolean>>;

}

const DeleteProduct= ({product,visible_delete,setvisible_delete}:product_delete) => {
  return (
    <div><Modal title={<h2>Delete   Category</h2>} visible={true} 
//     onOk={handlesubmit} 
   onCancel={()=>{setvisible_delete(false)}}
   width={600}
   >

  
       Select Category : 
   {/* <Tree
   checkable
       className="category_tree"
        onSelect={onSelect}
       treeData={categorylist}
       defaultSelectedKeys={[prop_selected_key]}
     /> */}
<Alert
       
       message={<Row><Col span={2} ><h2><InfoCircleOutlined /></h2></Col><Col><h3>Name: {product.name} </h3></Col></Row>}
       type="error"
      
     />
 
 </Modal></div>
  )
}

export default DeleteProduct