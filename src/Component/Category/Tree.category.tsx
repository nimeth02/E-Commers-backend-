/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {  Tree } from "antd";
import { useAppSelector } from "../../app/hook";
import { Category } from "../../Interfaces/categoryInterface";

const CategoryTree = () => {
  const categories = useAppSelector((state) => state.categories);
 // console.log(categories);
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
      let { _id, name, children, ...cat } = cate;
      let lat;
      if (children.length > -1) {
       // console.log("children", children);
        const chill = func(children);
        //console.log("chill", chill);
        if (head.includes(name)) {
          lat = { title: <h1>{name}</h1>, key: _id, children: chill };
        } else {
          lat = { title: <h2>{name}</h2>, key: _id, children: chill };
        }
      }
      list.push(lat);
    });
    return list;
  };

  const categorylist = func(categories.categories);
  //console.log("list", categorylist);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys: any, info: any) => {
    console.log("onCheck", checkedKeys, info);
  };
  return (
    <div className="content_category">
     
      <Tree
        className="category_tree"
        checkable
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={categorylist}
      />
    </div>
  );
};

export default CategoryTree;
