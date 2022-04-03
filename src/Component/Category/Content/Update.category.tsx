import { Col, Form, Input, Modal, Row, Tree } from "antd";
import React, { Key, useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  Category,
  check_content_interface,
} from "../../../Interfaces/categoryInterface";
import { checkerror } from "../../../utils/notifications/category";
import Formitem from "../../Login/Formitem";
import { Alert, Button, Space } from "antd";
import { categories_add, categories_update } from "../../../features/categoryslice";
import { DownCircleFilled, DownCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface update_category {
  update_visible: boolean;
  setupdate_visible: React.Dispatch<React.SetStateAction<boolean>>;
  updatecheck: check_content_interface;
}

const Updatecategory = ({
  update_visible,
  setupdate_visible,
  updatecheck,
}: update_category) => {
  console.log('%cupdate category','color:red');
  console.log(updatecheck);
  const navigate=useNavigate()
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch()

  const [select_key, setselect_key] = useState("");
  const [name, setname] = useState("");
  const [select_name, setselect_name] = useState("");

  var parent_category_name:string;

  const func = (categories: Category[]) => {
   
    
    let list: any[] = [];
    categories.map((cate, i) => {
      let { _id, name, children, ...cat } = cate;
       if(_id === updatecheck.parentId ){parent_category_name=name
       }
      let lat;
      if (children.length > -1) {
        const chill = func(children);

        lat = { title: <h3>{name}</h3>, key: _id, children: chill, };
      }
      list.push(lat);
    });
    return list;
  };

  const categorylist = func(categories.categories);


  console.log(name,select_key,select_name);
  useEffect(() => {
    console.log('%cupdate useEffect','color:green');  
    setname(updatecheck.name);

    setselect_name(parent_category_name);
    setselect_key(updatecheck.parentId)
  }, [updatecheck]);

 // console.log(updatecheck);
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const sele: string = selectedKeys[0] as unknown as string;
   // console.log("selected", selectedKeys[0], info);
    setselect_key(sele);
    setselect_name(info.node.title.props.children)
  };
  const onCancel=()=>{
     setupdate_visible(false);
  }
  const handlesubmit = async () => {
   // console.log(name, select_key,select_name);
    dispatch(categories_update({ name, parentId: select_key,_id:updatecheck.checkedlist }));
    setupdate_visible(false);
    setselect_key('');
    setselect_name('');
    setname('')
  };
 
  return (
    <div>
      {" "}
      <Modal
        title={<h2>Update Category</h2>}
        visible={update_visible}
        onOk={handlesubmit}
        onCancel={onCancel}
        width={600}
        
      >
        <Form>
          <Form.Item
            label="Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);

              }}
            />
          </Form.Item>
          <Alert
            message="If You Updating to Parent Category.Dont Select anyone"
            type="info"
            showIcon
            closable
          />
           <Alert
            message={<>if You want change  Parent Category select one  &nbsp;&nbsp;&nbsp;&nbsp;   <DownCircleTwoTone />  </> }
            type="info"
            showIcon
            closable
          />
          Change Parent Category ? 
          <Tree
            className="category_tree"
            onSelect={onSelect}
            treeData={categorylist}
            defaultSelectedKeys={[select_key]}
            // defaultExpandedKeys={[]}
          
          />
        </Form>
        <Alert
        
            message={<Row><Col span={2} ><h2><InfoCircleOutlined /></h2></Col><Col><h3>Name:  {name}</h3><p>Parent Category     : {select_name} </p></Col></Row>}
            type="warning"
           
          />
      </Modal>
    </div>
  );
};

export default Updatecategory;
