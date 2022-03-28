import { notification, Result } from "antd";

export const opensignup= (email:string,placement:any='top') => {
   
    notification.success({
      message: <Result
      status="success"
      title="Successfully Registered"
      subTitle= {`Email:  ${email}`}
      
    />,
      placement,
    });
  };

  export const openfillerror = (err:string,placement:any='top') => {
    notification.error({
      message:err,
      placement,
    });
  };

  export const opensignin = (placement:any='top') => {
    notification.success({
      message:'Signin Successfully',
      placement,
      duration:1
    });
  };

  export const openusrupdate = (placement:any='top') => {
    notification.success({
      message:'User update Successfully',
      placement,
      duration:1
    });
  };