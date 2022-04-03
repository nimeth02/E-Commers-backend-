import { Result ,Button} from 'antd'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hook'

const PrivateRoutes = ({children,permition}:{children:JSX.Element,permition:string}) => {
    const navigate=useNavigate()
    const user=useAppSelector(state=>state.user)
    
  return (
      
    <>{(user.Authed_admin == true && (user.user.role == permition || user.user.role == 'super_admin')) ? children  :<>  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to={'/'}><Button type="primary" >Back Home</Button></Link>}
  /></>}</>
  )
}

export default PrivateRoutes