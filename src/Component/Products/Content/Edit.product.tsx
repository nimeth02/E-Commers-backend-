import {
  DeleteOutlined,
  DownCircleTwoTone,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Form,
  Tree,
  Modal,
  Input,
  Col,
  Row,
  Divider,
  InputNumber,
  Avatar,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { pictureurl } from "../../../config/url.config";
import { products_update } from "../../../features/productslice";
import {
  product_add_Interface,
  product_update,
} from "../../../Interfaces/productInterface";

interface product_edit {
  product: product_add_Interface;
  visible_edit: boolean;
  setvisible_edit: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialproduct: product_update = {
  name: "",
  quantity: 0,
  description: "",
  price: 0,
  productImage:[{
    _id:'',
    img:''
}]
};

const EditProduct = ({
  product,
  visible_edit,
  setvisible_edit,
}: product_edit) => {
  //console.log(product);
  const dispatch = useAppDispatch();
  const [productimage, setproductimage] = useState<File[]>([]);
  const [product_update, setproduct_update] = useState(initialproduct);
  const { name, quantity, description, price ,productImage} = product_update;

const image_delete=(_id:string)=>{
 
  const lept:any=productImage.filter((img)=> {if(img){if(img._id !=_id) return img}})
  // setproduct_update({ ...product_update,productImage:lept});
  setproduct_update({...product_update,productImage:lept})
  console.log(lept,productImage);
  
}

  useEffect(() => {
    console.log("%cproduct useEffect", "color:green");
    setproduct_update({ ...product });
  }, [product]);
  const changeimages_handle = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      let filelist = e.target.files[0];
      setproductimage([...productimage, filelist]);
    }
  };
  const handlesubmit = () => {
   // console.log(product_update);
    const form =new FormData()
    form.append('name',name)
    form.append('quantity',String(quantity))
    form.append('price',String(price))
    form.append('description',description)
   
    for(let pic of productimage){
      form.append('productimage',pic)
    }
    
    for(let pic of productImage){
      
      if(pic){
        form.append('currentImage',pic._id)
      }
     
    }
    console.log(form,productImage);
    const _id=product._id
    dispatch(products_update({form,_id}))
    setvisible_edit(false)
  };

  return (
    <div>
      {" "}
      <Modal
        title={<h2>Edit Product</h2>}
        visible={true}
        onOk={handlesubmit}
        onCancel={() => setvisible_edit(false)}
        width={600}
      >
        <Form>
          <Form.Item
            label="Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              // name="name"
              value={name}
              onChange={(e) => {
                setproduct_update({ ...product_update, name: e.target.value });
              }}
            />
          </Form.Item>
          <Alert
            message={
              <Row>
                <Col span={2}>
                  <h2>
                    <InfoCircleOutlined />
                  </h2>
                </Col>
                <Col>
                  <p> Category : {product.categorytId.name} </p>
                </Col>
              </Row>
            }
            type="warning"
          />
          <div className="product_number_add">
            <Row>
              <Col span={14}>
                {" "}
                Price :
                <InputNumber
                  // name="price"
                  onChange={(value) => {
                    setproduct_update({ ...product_update, price: value });
                  }}
                  value={price}
                  addonBefore="Rs"
                />{" "}
              </Col>

              <Col span={10}>
                Quantity:{" "}
                <InputNumber
                  value={quantity}
                  // name="quantity"
                  onChange={(value) => {
                    setproduct_update({ ...product_update, quantity: value });
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
                  value={description}
                  onChange={(e) => {
                    setproduct_update({
                      ...product_update,
                      description: e.target.value,
                    });
                  }}
                />
                <></>,
              </Col>
            </Row>
            <Divider />
            <p>Product Images :</p>
            {productImage.map((img) => {
            return  img &&  <li key={img._id} className="img_list">
                <Row>
                  <Col span={20}>
                    <Avatar
                      shape="square"
                      src={pictureurl(img.img)}
                      size={30}
                    />{"  "}
                    {img.img}
                   </Col>
                  <Col span={4}> 
                  <DeleteOutlined onClick={()=>image_delete(img._id)}/> 
                   </Col>
                </Row>
               
              </li>;
            })}
            <input
              type="file"
              name="productimages"
             onChange={changeimages_handle}
            
            ></input>
           
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProduct;
