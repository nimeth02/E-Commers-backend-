import { Form, Input, Modal, Tree } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { Category } from '../../../Interfaces/categoryInterface';
import {  checkerror } from '../../../utils/notifications/category';
import Formitem from '../../Login/Formitem';
import { Alert, Button, Space } from 'antd';
import { categories_add } from '../../../features/categoryslice';
interface Prop{
    addvisible:boolean
}
interface addcategory {
    addvisible: boolean;
    setaddvisible: React.Dispatch<React.SetStateAction<boolean>>;
  }

const AddCategory = ({addvisible,setaddvisible}:addcategory) => {
  console.log('add category ');
  
    const categories = useAppSelector((state) => state.categories);
    const dispatch=useAppDispatch()
    const [select,setselect]=useState('')
    const [name,setname]=useState('')
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
        console.log("selected", selectedKeys[0],info);
        setselect(sele)
      };
    
 
      const handlesubmit=async()=>{
         // console.log(name,select); 
       dispatch(categories_add({name,parentId:select}))  
          setaddvisible(false)
        
    } 
  return (
    <div> <Modal title={<h2>Add   Category</h2>} visible={addvisible} 
     onOk={handlesubmit} 
    onCancel={()=>{setaddvisible(false)}}
    width={600}
    >
   <Form>
   <Form.Item
        label="Name"  
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input  name="name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
    </Form.Item>
    <Alert message="If You Adding Parent Category.Dont Select anyone" type="info" showIcon />  
        Select Parent Category : 
    <Tree
        className="category_tree"
         onSelect={onSelect}
        treeData={categorylist}
      />
   </Form>
  
  </Modal>
</div>
  )
}

export default AddCategory