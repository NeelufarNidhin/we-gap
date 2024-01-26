import { jwtDecode } from "jwt-decode";

const withAdminRole = (WrappedComponent:any) =>{

    return (props:any)  =>{

        const accessToken = localStorage.getItem("token");
        
        
       if(accessToken){
        const decode :{
            role : string;
        } = jwtDecode(accessToken)

      // console.log(decode.role)

        if(decode.role !== "admin" ){
           window.location.replace('./AccessDenied')
           return null;
          
        }
        
       }
       else {
           
        window.location.replace('./Login')
        return null;
    }
 return <WrappedComponent {...props}  />
    }
}

export default withAdminRole;