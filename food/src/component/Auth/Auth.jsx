import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Auth()
{
    const navigate = useNavigate();

    useEffect(()=>{
//bom
        var path=window.location.pathname;
        if(path=="/admin" || path=="/manage-users" || path=="/manage-donations" )
        {
            if(!localStorage.getItem("token") || localStorage.getItem("role")!="admin")
                navigate("/logout");
        }
        else if(path=="/user" || path=="/donate" ||  path=="/findfood" || path=="/editprofile" || path=="/changepassword" || path=="/service/impactracking" || path=="/impactracking"  || path=="/get-involved"  || path=="/volunteer"  || path=="/dashboard"  || path=="/partners"  || path=="/user-claims" )
        {
            if(!localStorage.getItem("token") || localStorage.getItem("role")!="user")
                navigate("/logout")
        }
        else
        {
            if(localStorage.getItem("role")=="admin")
                navigate("/admin")
            else if(localStorage.getItem("role")=="user")
                navigate("/user");
            else
                navigate(path);
        }

    },[])

    return(

        <></>

    )

}

export  default Auth;


