import { notification } from "antd";

export const checkerror = (placement:any='top') => {
    notification.error({
      message:"You can't chek more than one Parent Category",
      placement,
    });
  };
  export const addcategory_succ = (placement:any='top') => {
    notification.success({
      message:'Category Added Successfully',
      placement,
      duration:1
    });
  };
  export const addcategory_err = (placement:any='top') => {
    notification.error({
      message:'something went wrong',
      placement,
    });
  };
