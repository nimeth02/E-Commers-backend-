import React, { useEffect, useState } from "react";
import { Col,Row} from "antd";
import Button from "antd-button-color"
import CategoryTree from "../Tree.category";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { categories_get } from "../../../features/categoryslice";
import AddCategory from "./Add.category";
import DeleteCategory from "./Delete.category";
import Updatecategory from "./Update.category";
import {  Tree } from "antd";
import { Category, check_content_interface } from "../../../Interfaces/categoryInterface";
const initial_categorye:check_content_interface={
name:'',
parentId:'',
checkedlist:''
}

const Content = () => {
  console.log("%ccontent category component", "color:blue");

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);

  const [addvisible,setaddvisible]=useState<boolean>(false)
  const [update_visible,setupdate_visible]=useState<boolean>(false)
  const [delete_visible,setdelete_visible]=useState<boolean>(false)

  const [updatecheck,setupdatecheck]=useState(initial_categorye)
  const {name,parentId, checkedlist}=updatecheck

  useEffect(() => {  
    if(!categories.isupdated){
      console.log('content get and updated category changes'); 
      dispatch(categories_get());
     // setupdatecheck(initial_categorye)
     console.log(updatecheck);
     
    }
    console.log('after',updatecheck);
    
     setupdatecheck(initial_categorye)
  }, [categories.isupdated,dispatch]);

   //get main category to bold
   const head: string[] = [];
   categories.categories.map((cate, i) => {
     let { _id, name, children, ...cat } = cate;
     head.push(name);
   });
   //fetch all category
   const func = (categories: Category[]) => {
     let list: any[] = [];
     categories.map((cate, i) => {
       let { _id, name, children,parentId, ...cat } = cate;
       let lat;
       if (children.length > -1) {
        // console.log("children", children);
         const chill = func(children);
         //console.log("chill", chill);
         if (head.includes(name)) {
           lat = { title: <h1>{name}</h1>, key: _id, children: chill,parentId };
         } else {
           lat = { title: <h2>{name}</h2>, key: _id, children: chill,parentId };
         }
       }
       list.push(lat);
     });
     return list;
   };
 
   const categorylist = func(categories.categories);

  // const onSelect = (selectedKeys: React.Key[], info: any) => {
  //   //console.log("selected", selectedKeys, info);
  // };

  const onCheck = (checkedKeys: any, info: any) => {
   // console.log("onCheck", checkedKeys,checkedKeys.checked.length);
    if(checkedKeys.checked.length > 1){
    //  console.log('length across');  
      for(let i=checkedKeys.checked.length;1 < i;i--){
        
       checkedKeys.checked.pop()
     //  console.log(checkedKeys.checked);
      }
     
    }else if(checkedKeys.checked.length == 0){
      setupdatecheck({...updatecheck,name:'',parentId:'',checkedlist:''})
    }
    else{
      if( info.node.key == checkedKeys.checked[0]){
        setupdatecheck({...updatecheck,name:info.node.title.props.children,parentId:info.node.parentId,checkedlist:checkedKeys.checked[0]})
      // console.log('assign to update check',checkedKeys.checked[0]);
        }else{
      //    console.log('crash single check');
          
        }
    }
    // setupdatecheck({...updatecheck,name:info.node.title.props.children,parentId:info.node.parentId,checkedlist:checkedKeys.checked[0]})
 //   console.log('at final oncheck',name,checkedlist);
  };
 
  return (
    <div >
     
      <h1>Categories</h1>
      <Row>
        <Col span={15}>
        <div className="content_category">
     
       { categories.isupdated ? <Tree
       className="category_tree"
       checkable
      //  onSelect={onSelect}
      defaultCheckedKeys={[]}
      defaultExpandParent={true}
       onCheck={onCheck}
       treeData={categorylist}
       checkStrictly={true}
      
      
     />
      : null }
   </div></Col>
        <Col span={9} className="category_button_grop">
        <Button type="primary" className="category_add_button"
       onClick={()=>{setaddvisible(true)}} block>
        Add Category
      </Button>
      <Button type="info" className="category_update_button"
       onClick={()=>{
         setupdate_visible(true);
          console.log('update button',updatecheck);
       }}block >
        Update
      </Button>
      <Button type="danger" className="category_delete_button"
       onClick={()=>{setdelete_visible(true)}} block  >
        Delete
      </Button>    
     
     
      
      {addvisible && <AddCategory addvisible={addvisible} setaddvisible={setaddvisible}/>}
    {update_visible&&<Updatecategory update_visible={update_visible} setupdate_visible={setupdate_visible} updatecheck={updatecheck} />}
   { delete_visible &&  <DeleteCategory delete_visible={delete_visible} setdelete_visible={setdelete_visible} updatecheck={updatecheck}  setupdatecheck={setupdatecheck}/>}
      </Col>
      </Row>
    </div>
  );
};

export default Content;

