import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Tree,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Category } from "../../../Interfaces/categoryInterface";
import { checkerror } from "../../../utils/notifications/category";
import Formitem from "../../Login/Formitem";
import { Alert, Button, Space } from "antd";
import { categories_add } from "../../../features/categoryslice";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { productInterface } from "../../../Interfaces/productInterface";
import { product_add } from "../../../features/productslice";
import { add_product } from "../../../Interfaces/productInterface";

interface addproduct {
  addvisible: boolean;
  setaddvisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialproduct: productInterface = {
  name: "",
  quantity: 0,
  description: "",
  price: 0,
  select: "",
};

const AddProduct = ({ addvisible, setaddvisible }: addproduct) => {
  console.log("add product ");

  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [productimage, setproductimage] = useState<File[]>([]);
  const [product, setproduct] = useState(initialproduct);
  const { name, quantity, description, price, select } = product;

  const onchange = (e: any) => {
    console.log(e.target.name);

    const { name, value } = e.target;
    setproduct({ ...product, [name]: value });
  };

  const onChangtextArea = (e: any) => {
    console.log("Change:", e.target.value);
    setproduct({ ...product, description: e.target.value });
  };

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

  const changeimages_handle = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      let filelist = e.target.files[0];
      setproductimage([...productimage, filelist]);
    }
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const sele: string = selectedKeys[0] as unknown as string;
    console.log("selected", selectedKeys[0], info);
    setproduct({ ...product, select: sele });
  };

  const handlesubmit = async () => {
    // console.log(product,productimage);
    const form =new FormData()
    form.append('name',name)
    form.append('quantity',String(quantity))
    form.append('select',select)
    form.append('price',String(price))
    form.append('description',description)
    
    for(let pic of productimage){
      form.append('productimage',pic)
    }
console.log(form);

    
  dispatch(product_add(form));
    setaddvisible(false);
  };
  return (
    <>
      {" "}
      <Modal
        title={<h2>Add Product</h2>}
        visible={addvisible}
        onOk={handlesubmit}
        onCancel={() => {
          setaddvisible(false);
        }}
        width={600}
      >
        <Form>
          <Form.Item
            label="Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input name="name" value={name} onChange={onchange} />
          </Form.Item>
          <Divider />
          Select Category :
          <Tree
            className="category_tree"
            onSelect={onSelect}
            treeData={categorylist}
          />
          <Divider />
          <div className="product_number_add">
            <Row>
              <Col span={14}>
                {" "}
                Price :
                <InputNumber
                  name="price"
                  onChange={(value) => {
                    setproduct({ ...product, price: value });
                  }}
                  value={price}
                  addonBefore="Rs"
                />{" "}
              </Col>

              <Col span={10}>
                Quantity:{" "}
                <InputNumber
                  value={quantity}
                  name="quantity"
                  onChange={(value) => {
                    setproduct({ ...product, quantity: value });
                  }}
                />{" "}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={4} className="product_add_description_text">
                Description :
              </Col>

              <Col span={20}>
                <TextArea
                  placeholder="Product description"
                  className="product_add_textarea"
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  onChange={onChangtextArea}
                />
                <></>,
              </Col>
            </Row>
            <Divider />
            <p>Product Images :</p>
            <input
              type="file"
              name="productimages"
              onChange={changeimages_handle}
            ></input>
            {/* {
      productimage.length > 0 ? productimage.map((pic,i) => {
       return <p>juu</p>
      // <div key={i}>{JSON.stringify(pic.name)}</div>
    }) : <p>jiil</p>
    } */}

            {/* <Upload

    onChange={changeimages_handle}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload> */}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
