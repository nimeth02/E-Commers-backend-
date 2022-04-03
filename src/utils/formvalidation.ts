export const password_char=(password:string)=>{  
    if(password.length < 8 ) {return true}
    else{return false}
}

export const type_email=(email:string)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
   return  re.test(email);
}

export const match_password=(password:string,con_password:string)=>{ 
    //console.log(password,con_password);
     
    if(password == con_password ) {return true}
    else{return false}
}
export const mobile_char=(mobilenumber:string)=>{ 
   // console.log(mobilenumber);
     
    if(mobilenumber.length != 10 ) {return true}
    else{return false}
}