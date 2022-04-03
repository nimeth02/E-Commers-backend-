import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Drawer} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Formitem from "../../Component/Login/Formitem";
import { Admin_user_logout, Admin_user_update } from "../../features/userslice";
import { userprofile } from "../../Interfaces/userInterface";
import { match_password, mobile_char, password_char } from "../../utils/formvalidation";
import { openfillerror, openusrupdate } from "../../utils/notifications/loginnotifications";
interface item {
  title: string;
  content?: React.ReactNode;
}

interface profile {
  visible: boolean;
  setvisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({ visible, setvisible }: profile) => {
  const user = useAppSelector((state) => state.user);
  const dispatch=useAppDispatch()
  const initialUserprofile: userprofile = {
    name: "",
    mobilenumber: "",
    password: "",
    confirm_password: "",
  };
  const [profile, setprofile] = useState(initialUserprofile);
  let { name, mobilenumber, password, confirm_password } = profile;
  const [set, setset] = useState(false);

const navigate=useNavigate()

  const onsettings = () => {
    setset(true);
    setprofile({...profile,name:user.user.name,mobilenumber:user.user.mobilenumber})
  };
  const onlogout =()=>{
    dispatch(Admin_user_logout())
    setvisible(false);
    navigate("/")
  }
  const onupdate=()=>{
    if( name === '' || mobilenumber === '') {
      console.log('email his') 
      openfillerror('fill required fields')
      return
    } 
 
    if(mobile_char(mobilenumber)){ 
      console.log('10 mobile char'); 
      openfillerror('invalied mobile number')
      return
        }  
        if(password){ 
    if(password_char(password)){ 
      console.log('8 char password'); 
      openfillerror('password must have least 8 characters')
      return
      }
    if(!match_password(password,confirm_password)){ 
      console.log('match password'); 
      openfillerror('confirm password does not match')
      return
      }
    }
      dispatch(Admin_user_update({name,mobilenumber,password}))
      openusrupdate()
    setset(false)
  }

  const DescriptionItem = ({ title, content }: item) => (
    <div className="site-description-item-profile-wrapper">
      <h3 className="site-description-item-profile-p-label">{title}:</h3>
      <p>{content}</p>
    </div>
  );
  const onclose = () => {
    setvisible(false);
  };
    const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      let {name,value}=e.target
      setprofile({...profile,[name]:value})
    }

  return (
    <div>
      {" "}
      <Drawer
        width={440}
        placement="right"
        closable={false}
        onClose={onclose}
        visible={visible}
      >
        <h1 id="profile_name">
         
          {user.user.name}
          <Avatar className="avatar_icon" size={54} icon={<UserOutlined />} />
         {!set && <Button id="lgout" type="primary" danger onClick={onlogout}>
            Log out
          </Button>} 
        </h1>{
          set ? <div className="update_form"><Formitem onchange={onchange} type={name} label={'name'} />
          <Formitem onchange={onchange} type={mobilenumber} label={'mobilenumber'} />
          <Formitem onchange={onchange} type={password} label={'password'} />
          <Formitem onchange={onchange} type={confirm_password} label={'confirm_password'} />
         <div className="btn_pro"> <Button  type="primary" danger onClick={onupdate}>
            Update
          </Button>
          <Button  type="primary"  onClick={()=>setset(false)}>
            Back to Profile
          </Button>
          </div>
          </div> 
          :<> <div className="description">
          <DescriptionItem title={`Name  `} content={`${user.user.name}`} />

          <DescriptionItem title={`Role `} content={`${user.user.role}`} />
          <Divider />

          <DescriptionItem title="Email" content={`${user.user.email}`} />
          <DescriptionItem
            title="Phone Number"
            content={`${user.user.mobilenumber}`}
          />
        </div>
        <Button id="up" type="primary" onClick={onsettings}>
          <SettingOutlined />
          Settings 
        </Button>
        <br /></>
        }
       
      </Drawer>
    </div>
  );
};

export default Profile;
