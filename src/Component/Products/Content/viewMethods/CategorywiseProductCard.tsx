import { Col, Row, Tree } from 'antd';
import React, { useState } from 'react'
import { useAppSelector } from '../../../../app/hook';
import { Category } from '../../../../Interfaces/categoryInterface';
import Onecard from './Onecard';

const ProductCardCategorywise = () => {
  const categories = useAppSelector((state) => state.categories);
  const products = useAppSelector((state) => state.products);
  const [selected,setselected]=useState<string[]>([])
  const func = (categories: Category[]) => {
      let list: any[] = [];
      categories.map((cate, i) => {
        let { _id, name, children,parentId, ...cat } = cate;
        let lat;
        if (children.length > -1) {
         // console.log("children", children);
          const chill = func(children);
          
         
          //console.log("chill", chill);
          
          lat = { title:<> <h3>{name}</h3>  </>, key: _id, children: chill,parentId };
        }
        list.push(lat);
      });
      return list;
    };
  
    const categorylist = func(categories.categories);

    const onCheck = (checkedKeys:any, info: any) => {
      console.log('onCheck', checkedKeys, info);
      setselected(checkedKeys)
    };
    console.log(selected);
    
return (
  <div><Row>
    <Col span={7}>
    <Tree
  checkable
  onCheck={onCheck}
  treeData={categorylist}

 
 
/>
  </Col>
  <Col span={17}>
    {products.products.map((product,i)=>{
      console.log('jj',product)
      // return <>kk</>
     if(selected.includes(product.categorytId._id)){
      return<><Onecard product={product}/></> 
     }
     
        // return (<Onecard product={product} />)
      // return 
      // console.log('oye')
       
    })}
  </Col>
  </Row> </div>
)
}

export default ProductCardCategorywise