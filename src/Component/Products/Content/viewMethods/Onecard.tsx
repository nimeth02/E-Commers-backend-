
import {  Card, Carousel, Col, Collapse, Divider, List, Row } from "antd";
import React, { useState } from "react";
import Button from "antd-button-color"
import { useAppSelector } from "../../../../app/hook";
import { product_add_Interface, product_initial } from "../../../../Interfaces/productInterface";
import { pictureurl } from "../../../../config/url.config";
import EditProduct from "../Edit.product";
import DeleteProduct from "../Delete.products";

interface onecard{
    product:product_add_Interface
}

const Onecard = ({product}:onecard) => {
    console.log(product,'onecard');
    
    const { Panel } = Collapse;
  const [visible_edit,setvisible_edit]=useState<boolean>(false)
  const [visible_delete,setvisible_delete]=useState<boolean>(false)
  return (
    <div>  
          <div key={product._id} >
            <Collapse accordion>
              <Panel header={<Row style={{width:"100%"}}><Col span={20}><h3>{product.name} </h3></Col><Col span={4}><div >Rs:{product.price}</div></Col></Row>} key="1">
                <Row>
                <Col >
                {product.productImage && product.productImage.length > 0 ? (
                  <>
                    <Carousel className="carousel_product">
                      {product.productImage.map((product_img:any) => {
                      return ( product_img && 
                          <div className="div_carousel" key={product_img._id}>
                            <img
                              className="product_list_img"
                              src={pictureurl(product_img.img)}
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </>
                ) : (
                  <Carousel className="carousel_product">
                    <div>
                      <h3 className="h3_carousel">No images</h3>
                    </div>
                  </Carousel>
                )}
                </Col>
                <Col className="product_details_in_panel">
                <h4 className="detail_p"><div className="detail_div">Quantity : {product.quantity && product.quantity}</div> <div className="detail_div_right">Category : {product.categorytId && product.categorytId.name} </div> </h4>
               
                <h4>Description :</h4> {product.description}
                <br/><br/>
                <Button className="btn_product" onClick={()=>setvisible_edit(true)} type="info">Edit</Button>
                <Button className="btn_product" onClick={()=>setvisible_delete(true)}  type="danger" >Delete</Button>
              {visible_edit && <EditProduct setvisible_edit={setvisible_edit} visible_edit={visible_edit} product={product}/>}
              {visible_delete &&  <DeleteProduct setvisible_delete={setvisible_delete} visible_delete={visible_delete} product={product}/>}  
              
                </Col>
                </Row>
              </Panel>
            </Collapse>
          </div>
         
      
</div>
  )
}

export default Onecard