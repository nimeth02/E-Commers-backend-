import { Col, Form, Input, Modal, Row, Tree } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { Category, check_content_interface } from '../../../Interfaces/categoryInterface';
import {  checkerror } from '../../../utils/notifications/category';
import Formitem from '../../Login/Formitem';
import { Alert, Button, Space } from 'antd';
import { categories_add, categories_delete } from '../../../features/categoryslice';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
interface Prop{
    delete_visible:boolean
}
interface delete_category {
    delete_visible: boolean;
    setdelete_visible: React.Dispatch<React.SetStateAction<boolean>>;
    updatecheck: check_content_interface;
    setupdatecheck:React.Dispatch<React.SetStateAction<check_content_interface>>
  }

const DeleteCategory = ({delete_visible,setdelete_visible,updatecheck,setupdatecheck}:delete_category) => {
  console.log('delete category');
    const categories = useAppSelector((state) => state.categories);
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
//console.log(updatecheck);

    const [select,setselect]=useState('')
    const [name,setname]=useState('')
    const [prop_selected_key, setprop_selected_key] = useState("");

    const func = (categories: Category[]) => {
        let list: any[] = [];
        categories.map((cate, i) => {
          let { _id, name, children, ...cat } = cate;
          let lat;
          if (children.length > -1) {
          
            const chill = func(children);
            
         
              lat = { title: <h3>{name}</h3>, key: _id, children: chill };
            
          }
          list.push(lat);
        });
        return list;
      };
    
      const categorylist = func(categories.categories);
    
    
      const onSelect = (selectedKeys: React.Key[], info: any) => {
      
        const sele:string=(selectedKeys[0] as unknown) as string
       // console.log("selected", selectedKeys[0],info);
        setselect(sele)
      };
    
 
      const handlesubmit=async()=>{
        //  console.log(name,select); 
         dispatch(categories_delete({ _id:prop_selected_key}));  
       setdelete_visible(false)
      //2  setupdatecheck({name:'',
      //  parentId:'',
      //  checkedlist:'623c4ed86c363b8f8337c3cc'})
    // 1 navigate('/category')
    } 
  

    useEffect(() => {
       setname(updatecheck.name);
      // setselect_name(dummy_name);
      setprop_selected_key((key)=>key=updatecheck.checkedlist)
     // console.log(prop_selected_key,'hell',updatecheck.checkedlist);
      
    }, [updatecheck]);
  
  return (
    <div> <Modal title={<h2>Delete   Category</h2>} visible={delete_visible} 
     onOk={handlesubmit} 
    onCancel={()=>{setdelete_visible(false)}}
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
        
        message={<Row><Col span={2} ><h2><InfoCircleOutlined /></h2></Col><Col><h3>Name:  {name}</h3></Col></Row>}
        type="error"
       
      />
  
  </Modal>
</div>
  )
}

export default DeleteCategory