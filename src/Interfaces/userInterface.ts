export interface usersignup{
    name:string
    mobilenumber:string
    email:string
    password:string
    confirm_password:string
  }

  export interface usersignin{
    email:string
    password:string
  }
  export interface userprofile{
    name:string
    mobilenumber:string
    password:string
    confirm_password:string
  }
  export interface updateprofile{
    name:string
    mobilenumber:string
    password:string

  }