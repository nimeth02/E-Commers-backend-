import { Result ,Button} from 'antd'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hook'

const PrivateRoutes = ({children}:{children:JSX.Element}) => {
    const navigate=useNavigate()
    const user=useAppSelector(state=>state.user)
  return (
      
    <>{user.user.role == 'super_admin' ? children  :<>  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to={'/'}><Button type="primary" >Back Home</Button></Link>}
  /></>}</>
  )
}

export default PrivateRoutes